use std::cmp::min;
use std::time::Instant;

const INPUT: &str = include_str!("../../../../../data/2015-02.txt");

fn main() {
    // Part 1
    {
        let now = Instant::now();
        let result = part_1(INPUT);
        let duration = now.elapsed();
        println!("Result: {}", result);
        println!("Part 1 {:?}", duration);
    }

    // Part 2
    {
        let now = Instant::now();
        let result = part_2(INPUT);
        let duration = now.elapsed();
        println!("Result: {}", result);
        println!("Part 2 {:?}", duration);
    }
}

pub fn part_1(file: &str) -> u32 {
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

    sum
}

pub fn part_2(file: &str) -> u32 {
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

    sum
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn part_1_sample() {
        let file = r#"
        "#;

        assert_eq!(part_1(file), 0);
    }

    #[test]
    #[ignore]
    fn part_1_real() {
        assert_eq!(part_1(INPUT), 0);
    }

    #[test]
    #[ignore]
    fn part_2_sample() {
        let file = r#"
        "#;

        assert_eq!(part_2(file), 0);
    }

    #[test]
    #[ignore]
    fn part_2_real() {
        assert_eq!(part_2(INPUT), 0);
    }
}
