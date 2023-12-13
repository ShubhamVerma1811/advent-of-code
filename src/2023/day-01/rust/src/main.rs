use std::time::Instant;

const INPUT: &str = include_str!("../../../../../data/2023-01.txt");

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
    let mut sum: u32 = 0;

    for line in data.lines() {
        let mut i = 0;
        let mut j = line.len() - 1;

        let chars: Vec<char> = line.chars().collect();

        while i <= j {
            if chars[i].is_numeric() && chars[j].is_numeric() {
                break;
            } else {
                if chars[i].is_alphabetic() {
                    i += 1
                }
                if chars[j].is_alphabetic() {
                    j -= 1
                }
            }
        }

        sum += format!("{}{}", chars[i], chars[j]).parse::<u32>().unwrap();
    }

    sum
}

pub fn part_2(data: &str) -> u32 {
    let mut sum = 0;

    for line in data.lines() {
        let new_line = line
            .replace("one", "o1e")
            .replace("two", "t2o")
            .replace("three", "th3ee")
            .replace("four", "fo4r")
            .replace("five", "fi5e")
            .replace("six", "s6x")
            .replace("seven", "se7en")
            .replace("eight", "ei8ht")
            .replace("nine", "ni9e");

        let chars: Vec<char> = new_line.chars().collect();

        let mut i = 0;
        let mut j = new_line.len() - 1;

        while i <= j {
            if chars[i].is_numeric() && chars[j].is_numeric() {
                break;
            } else {
                if chars[i].is_alphabetic() {
                    i += 1;
                }

                if chars[j].is_alphabetic() {
                    j -= 1;
                }
            }
        }

        sum += format!("{}{}", chars[i], chars[j]).parse::<u32>().unwrap();
    }

    sum
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
