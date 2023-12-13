use std::time::Instant;

const INPUT: &str = include_str!("../../../../../data/2015-01.txt");

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

pub fn part_1(data: &str) -> i32 {
    let mut sum = 0;

    for i in data.chars() {
        if i == '(' {
            sum += 1
        } else {
            sum -= 1
        }
    }

    sum
}

pub fn part_2(data: &str) -> i32 {
    let mut sum = 0;

    for (idx, i) in data.chars().enumerate() {
        if i == '(' {
            sum += 1
        } else {
            sum -= 1
        }

        if sum < 0 {
            return (idx + 1) as i32;
        }
    }

    0
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
