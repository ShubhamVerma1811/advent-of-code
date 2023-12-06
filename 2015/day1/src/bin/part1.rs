fn main() {
    let file = include_str!("input.txt");

    let mut sum = 0;

    for i in file.chars() {
        if i == '(' {
            sum += 1
        } else {
            sum -= 1
        }
    }

    print!("{sum}");
}
