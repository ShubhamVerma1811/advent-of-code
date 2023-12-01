fn main() {
    let content = include_str!("input.txt");

    let mut sum: u32 = 0;

    for line in content.lines() {
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

    println!("{sum}");
}
