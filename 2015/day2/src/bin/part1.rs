use std::cmp::min;

fn main() {
    let file = include_str!("input.txt");
    let mut sum = 0;
    for line in file.lines() {
        let values: Vec<&str> = line.split("x").collect();

        let l = values[0].parse::<u32>().unwrap();
        let w = values[1].parse::<u32>().unwrap();
        let h = values[2].parse::<u32>().unwrap();

        let e = min(l * w, min(w * h, h * l));

        let surface_area = 2 * l * w + 2 * w * h + 2 * h * l;

        sum += surface_area + e;
    }

    print!("{sum}");
}
