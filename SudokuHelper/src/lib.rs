
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

fn is_in_block(current_block : usize, in_pos : usize, in_grid_block : &[u8]) -> bool{
    return (in_pos < in_grid_block.len())
     && (current_block < in_grid_block.len())
     && (in_grid_block[current_block] == in_grid_block[in_pos]);
}

fn get_pos(x : usize, y : usize) -> usize {
    return y*SUDOKU_SIZE+x;
}

fn get_coord(in_pos : usize) -> (usize, usize) {
    return ((in_pos%SUDOKU_SIZE), (in_pos/SUDOKU_SIZE));
}

pub fn get_possible_values(in_pos : usize, in_grid : &Vec::<u8>, in_grid_block : &[usize]) -> Vec::<u8> {

    let (x,y) = get_coord(in_pos);
    let mut possible_values = vec![1,2,3,4,5,6,7,8,9];


    for posi in in_grid_block.iter() {
        let val = in_grid[*posi] as usize;

        if val != 0 {
            possible_values[val - 1] = 0;
        }
    }

    for value in in_grid[y*SUDOKU_SIZE..(y+1)*SUDOKU_SIZE].iter() {
        if *value != 0 {
            possible_values[(*value - 1) as usize] = 0;
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

pub fn get_block_number(in_pos : usize)->usize {
    (in_pos/3)%3 + (in_pos/27)*3
}

pub fn create_grid_block() -> Vec::<usize>
{
    let mut grid = vec![0; SUDOKU_SIZE*SUDOKU_SIZE];

    for pos in 0..SUDOKU_SIZE*SUDOKU_SIZE {
        let block_number = get_block_number(pos);

        for value in grid[block_number*SUDOKU_SIZE..(block_number*SUDOKU_SIZE + SUDOKU_SIZE)].iter_mut() {

            if *value == 0 {
                *value = pos;
                break;
            }

        }
    }

    return grid;
}


#[wasm_bindgen]
pub struct ExportedResults {
    pub is_done: bool,
}

#[wasm_bindgen]
pub fn return_named_struct(is_done: bool) -> ExportedResults {
    ExportedResults { is_done }
}

#[wasm_bindgen]
pub fn solve(in_grid : js_sys::Uint8Array, exported : &mut ExportedResults) -> js_sys::Uint8Array {

    let grid_block = create_grid_block();
    let mut stack = Vec::<(i16, usize, usize)>::new();
    let mut final_grid = in_grid.to_vec();
    let mut grid = in_grid.to_vec();

    exported.is_done = false;

    stack.push((-1, 0, 0));
    
    
    while stack.len() > 0 && !exported.is_done {
        let (value,start,index_value) = stack.pop().unwrap();
        let mut temp_index_value = index_value;
        let mut i : usize = start;
        if value >= 0 {
            grid[start] = value as u8;
        }

        for pos in start..grid.len() {
            if grid[pos] == 0 {
                let block_number = get_block_number(pos);

                let possible_values = get_possible_values(pos, &grid,
                     &grid_block[block_number*SUDOKU_SIZE..block_number*SUDOKU_SIZE + SUDOKU_SIZE]);

                if possible_values.len() > temp_index_value {
                    let v =  possible_values[temp_index_value] as i16;
                    temp_index_value+=1;
                    stack.push((grid[pos] as i16, pos, temp_index_value));
                    grid[pos] = v as u8;

                    temp_index_value = 0;
                }
                else {
                    break;
                }
            }
            i = pos;
        }
        exported.is_done = i == final_grid.len() - 1;
        if exported.is_done {
            final_grid = grid.to_vec();
        }
    }
    

    return js_sys::Uint8Array::from(&final_grid[..]); 
}