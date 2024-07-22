import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Main {
  public static void main(String[] args) {

    String data = null;

    try {
      Path path = Paths.get("data/{{YEAR}}-{{DAY}}.txt");
      data = Files.readString(path);
    } catch (IOException e) {
      System.out.println("An error occurred while reading the file: " + e.getMessage());
      return;
    }

    // Part 1
    {
      long start = System.nanoTime();
      System.out.println("Result: " + part1(data));
      long end = System.nanoTime() - start;
      System.out.println(String.format("Part 1 took %d nanoseconds%n", end));
    }

    // Part 2
    {
      long start = System.nanoTime();
      System.out.println("Result: " + part2(data));
      long end = System.nanoTime() - start;
      System.out.println(String.format("Part 2 took %d nanoseconds%n", end));
    }
  }

  private static String part1(String data) {
    return "Part1 java";
  }

  private static String part2(String data) {
    return "Part2 java";
  }

}
