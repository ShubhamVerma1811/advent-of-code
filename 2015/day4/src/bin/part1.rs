use md5::compute;

fn main() {
    let file = include_str!("input.txt");

    let mut i = 0;

    while !format!("{:x}", compute(format!("{}{}", file, i))).starts_with("00000") {
        i += 1;
    }

    print!("{i}");
}
