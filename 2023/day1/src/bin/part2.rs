fn main() {
    let content = include_str!("input.txt");
    let mut sum = 0;

    for line in content.lines() {
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

    println!("{sum}");
}
