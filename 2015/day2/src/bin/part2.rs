use std::cmp::min;

fn main() {
    let file = include_str!("input.txt");
    let mut sum = 0;
    for line in file.lines() {
        let values: Vec<&str> = line.split("x").collect();

        let l = values[0].parse::<u32>().unwrap();
        let w = values[1].parse::<u32>().unwrap();
        let h = values[2].parse::<u32>().unwrap();

        let e = min(l + l + w + w, min(h + h + w + w, l + l + h + h));
        let surface_area = l * w * h;

        sum += surface_area + e;
    }

    print!("{sum}");
}
