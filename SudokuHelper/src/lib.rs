
 use wasm_bindgen::prelude::*;
 extern crate web_sys;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

 // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
 // allocator.
 #[cfg(feature = "wee_alloc")]
 #[global_allocator]
 static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
 static SUDOKU_SIZE: usize = 9;

 #[wasm_bindgen]
 pub fn greet() -> String {
     "Hello, wasm-game-of-life!".into()
}

fn is_in_block(current_block : usize, in_pos : usize, in_grid_block : &Vec::<u8>) -> bool{
    return (in_pos < in_grid_block.len())
     && (current_block < in_grid_block.len())
     && (in_grid_block[current_block] == in_grid_block[in_pos]);
}

fn get_pos(x : usize, y : usize) -> usize {
    return y*SUDOKU_SIZE+x;
}

fn get_coord(in_pos : usize) -> (i8, i8) {
    return ((in_pos%SUDOKU_SIZE) as i8, (in_pos/SUDOKU_SIZE) as i8);
}

pub fn get_possible_values(in_pos : usize, in_grid : &Vec::<u8>, in_grid_block : &Vec::<u8>) -> Vec::<u8> {

    let (x,y) = get_coord(in_pos);
    let mut possible_values = vec![1,2,3,4,5,6,7,8,9];

    for xi in (x - 3)..(x + 3) {

        if xi < 0 {
            continue;
        }
        for yi in (y - 3)..(y + 3) {
            if yi < 0 {
                continue;
            }
            let posi = get_pos(xi as usize, yi as usize);
            if is_in_block(in_pos, posi, in_grid_block) {
                let val = in_grid[posi] as usize;

                if val != 0 {
                    possible_values[val - 1] = 0;
                }
            }
        }
    }

    for xi in 0..SUDOKU_SIZE {
        let posi = get_pos(xi as usize, y as usize);
        let val = in_grid[posi] as usize;
        if val != 0 {
            possible_values[val - 1] = 0;
        }
        
    }

    for yi in 0..SUDOKU_SIZE {
        let posi = get_pos(x as usize, yi as usize);
        let val = in_grid[posi] as usize;
        if val != 0 {
            possible_values[val - 1] = 0;
        }
    }
    possible_values.retain(|&x| x != 0);
    return possible_values;
}


#[wasm_bindgen]
pub struct ExportedResults {
    pub isDone: bool,
}

#[wasm_bindgen]
pub fn return_named_struct(isDone: bool) -> ExportedResults {
    ExportedResults { isDone }
}

#[wasm_bindgen]
pub fn solve(in_grid : js_sys::Uint8Array, in_grid_coordinates : js_sys::Uint8Array, exported : &mut ExportedResults) -> js_sys::Uint8Array {
    let grid_coordinates = in_grid_coordinates.to_vec();

    let mut stack = Vec::<(Vec::<u8>, usize, usize)>::new();
    let mut final_grid = in_grid.to_vec();
    let mut isDone = false;
    stack.push((in_grid.to_vec(), 0, 0));
    
    while stack.len() > 0 && !isDone {
        let (grid,start,index_value) = stack.pop().unwrap();
        let mut temp_grid = grid;
        let mut temp_index_value = index_value;
        let mut i : usize = start;
        while i < temp_grid.len() {
            if temp_grid[i] == 0 {
                let possible_values = get_possible_values(i, &temp_grid, &grid_coordinates);

                if possible_values.len() > temp_index_value {
                    temp_grid[i] = possible_values[temp_index_value];
                    if possible_values.len() > 1 {
                        temp_index_value+=1;
                        stack.push((temp_grid.to_vec(), i, temp_index_value));
                    }

                    temp_index_value = 0;
                }
                else {
                    break;
                }
            }
            i+=1;
        }

        isDone = i == temp_grid.len();
        if isDone {
            final_grid = temp_grid.to_vec();
        }
    }
    exported.isDone = isDone;

    return js_sys::Uint8Array::from(&final_grid[..]); 
}