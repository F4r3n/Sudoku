
 use core::num;

use rand::Rng;

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

pub fn build_proabilities_array(in_grid : &Vec::<u8>, in_grid_block : &Vec::<usize>) -> Vec::<(usize, Vec::<u8>)> {
    let mut probas = Vec::<(usize, Vec::<u8>)>::new();
    for index in 0..SUDOKU_SIZE*SUDOKU_SIZE {
        if in_grid[index] == 0 {
            let block_number = get_block_number(index);
            let proba = (index, get_possible_values(index, in_grid, 
                &in_grid_block[block_number*SUDOKU_SIZE..block_number*SUDOKU_SIZE + SUDOKU_SIZE]));
            probas.push(proba);
        }
    }
    probas.sort_by(| a, b| a.1.len().cmp(&b.1.len()));

    return probas;
}

pub fn get_possible_values_from_pos(in_pos : usize, in_grid : &Vec::<u8>, in_grid_block : &Vec::<usize>) -> Vec::<u8> {
    let block_number = get_block_number(in_pos);
    let proba = get_possible_values(in_pos, in_grid, 
        &in_grid_block[block_number*SUDOKU_SIZE..block_number*SUDOKU_SIZE + SUDOKU_SIZE]);

    return proba;
}

pub fn update_probabilities(in_probabilites : & mut Vec::<(usize, Vec::<u8>)>, in_grid : &Vec::<u8>, in_grid_block : &Vec::<usize>) {
    for value in in_probabilites.iter_mut() {
        let v =  in_grid[value.0];
        if v == 0 {
            let block_number = get_block_number(value.0);
            let proba = get_possible_values(value.0, in_grid, 
                &in_grid_block[block_number*SUDOKU_SIZE..block_number*SUDOKU_SIZE + SUDOKU_SIZE]);
            value.1 = proba;
        }
        else
        {
            value.1.clear();
        }
    }
    in_probabilites.retain(|x| x.1.len() > 0);
    in_probabilites.sort_by(| a, b| a.1.len().cmp(&b.1.len()));
}

pub fn solve_sudoku( in_grid : Vec::<u8>, find_unicity : bool)->(bool, Vec::<u8>, bool) {

    let grid_block = create_grid_block();
    let mut stack = Vec::<(Vec::<u8>, usize, usize)>::new();
    let mut final_grid = in_grid.to_vec();

    let mut is_done = false;
    let mut number_solutions = 0;

    stack.push((in_grid, 0, 0)); 
    
    while stack.len() > 0 && (find_unicity || !is_done) {
        let (mut grid,start,index_value) = stack.pop().unwrap();
        let mut temp_index_value = index_value;
        let mut i : usize = start;

        for pos in start..grid.len() {
            if grid[pos] == 0 {
                let block_number = get_block_number(pos);

                let possible_values = get_possible_values(pos, &grid,
                     &grid_block[block_number*SUDOKU_SIZE..block_number*SUDOKU_SIZE + SUDOKU_SIZE]);


                if possible_values.len() > temp_index_value {
                    let v =  possible_values[temp_index_value] as i16;
                    temp_index_value+=1;

                    if possible_values.len() > 1 {
                        stack.push((grid.clone(), pos, temp_index_value));
                    }
                    grid[pos] = v as u8;

                    temp_index_value = 0;
                }
                else {
                    break;
                }
            }
            i = pos;
        }
        
        is_done = i == final_grid.len() - 1;
        if is_done {
            number_solutions+=1;
            final_grid = grid.to_vec();
        }

        if find_unicity && number_solutions > 1 {
            break;
        }
    }

    return (is_done, final_grid, number_solutions!=0);
}

pub fn print_grid( grid : &Vec::<u8>) {
    for y in 0..9 {
        if y%3 == 0 {
            for _ in 0..9 {
                print!("---");
            }
            print!("\n");
        }

        for x in 0..9 {
            print!(" {} ", grid[get_pos(x, y)]);
            if x %3 == 0 && x > 0 {
                print!("|");
            }
        }
        print!("\n");
    }
    print!("\n");
}

pub fn generate_random_grid() -> Vec::<u8> {
    let mut grid = vec![0; SUDOKU_SIZE*SUDOKU_SIZE];
    let mut rng = rand::thread_rng();
    let grid_block = create_grid_block();

    for _i in 0..30 {
        let pos: usize = rng.gen_range(0..SUDOKU_SIZE*SUDOKU_SIZE);
        if grid[pos] == 0 {
            let possible_values = get_possible_values_from_pos(pos, &grid, &grid_block);
            if possible_values.len() > 0 {
                let random = rng.gen_range(0..possible_values.len());
                let value: u8 = possible_values[random];

                if value > 0 {
                    grid[pos] = value;
                }
            }

        }
    }

    return grid;
}

pub fn generate(in_level : u8) -> Vec<u8> {

    let max_level = 5;
    let mut grid: Vec<u8>;

    if in_level < 5 {
        let number_cases_to_remove = (((in_level as f32/max_level as f32) as f32)*((SUDOKU_SIZE*SUDOKU_SIZE) as f32)) as usize;

    //generate a grid
        loop {
            let mut rng = rand::thread_rng();
            let (done, final_grid, _) = solve_sudoku( generate_random_grid(), false);
            grid = final_grid;
            let mut changes_number = 0;
            let mut is_valid = false;
            if done {
                while !is_valid {
                    let pos: usize = rng.gen_range(0..SUDOKU_SIZE*SUDOKU_SIZE);
                    if grid[pos] != 0 {
                        let former_value = grid[pos];
                        grid[pos] = 0;
                        let (_, _, is_unique) = solve_sudoku(grid.to_vec(), true);
                        if !is_unique {
                            grid[pos] = former_value;
                        }
                        else {
                            changes_number+=1;
                        }
                    }

                    if changes_number > number_cases_to_remove {
                        is_valid = true;
                        break;
                    }
                }
            }

            if is_valid {
                break;
            }
        }
    }
    else
    {
        grid = vec![0;SUDOKU_SIZE*SUDOKU_SIZE];
    }




    return grid; 
}

#[wasm_bindgen]
pub fn generate_wasm(in_level : u8) -> js_sys::Uint8Array {

    let grid = generate(in_level);
    return js_sys::Uint8Array::from(&grid[..]); 
}

#[wasm_bindgen]
pub fn solve_wasm(in_grid : js_sys::Uint8Array, exported : &mut ExportedResults) -> js_sys::Uint8Array {

    let (done, final_grid, _) = solve_sudoku(in_grid.to_vec(), false);
    exported.is_done = done;

    return js_sys::Uint8Array::from(&final_grid[..]); 
}
