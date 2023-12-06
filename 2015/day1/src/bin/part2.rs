fn main() {
    let file = include_str!("input.txt");

    let mut sum = 0;

    for (idx, i) in file.chars().enumerate() {
        if i == '(' {
            sum += 1
        } else {
            sum -= 1
        }

        if sum < 0 {
            print!("{}", idx + 1);
            break;
        }
    }
}
