use md5::compute;
use std::time::Instant;

const INPUT: &str = include_str!("../../../../../data/2015-04.txt");

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

pub fn part_1(data: &str) -> u32 {
    let file = data;

    let mut i = 0;

    while !format!("{:x}", compute(format!("{}{}", file, i))).starts_with("00000") {
        i += 1;
    }

    i
}

pub fn part_2(data: &str) -> u32 {
    let file = data;

    let mut i = 0;

    while !format!("{:x}", compute(format!("{}{}", file, i))).starts_with("000000") {
        i += 1;
    }

    i
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn part_1_sample() {
        let data = r#"
        "#;

        assert_eq!(part_1(data), 0);
    }

    #[test]
    #[ignore]
    fn part_1_real() {
        assert_eq!(part_1(INPUT), 0);
    }

    #[test]
    #[ignore]
    fn part_2_sample() {
        let data = r#"
        "#;

        assert_eq!(part_2(data), 0);
    }

    #[test]
    #[ignore]
    fn part_2_real() {
        assert_eq!(part_2(INPUT), 0);
    }
}
