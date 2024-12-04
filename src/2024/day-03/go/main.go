package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"
)

func main() {

	data, err := os.ReadFile("../../../../data/2024-03.txt")
	if err != nil {
		panic(err)
	}

	// Part 1
	{
		start := time.Now()
		fmt.Println("Result: ", part1(data))
		elapsed := time.Since(start)
		fmt.Printf("Part 1 %v\n", elapsed)
	}

	// Part 2
	{
		start := time.Now()
		fmt.Println("Result: ", part2(data))
		elapsed := time.Since(start)
		fmt.Printf("Part 2 %v\n", elapsed)
	}

}

func part1(data []byte) interface{} {
	lines := strings.Split(string(data), "\n")
	pattern := regexp.MustCompile(`mul\((\d{1,3}),(\d{1,3})\)`)
	sum := 0

	for _, line := range lines {
		res := pattern.FindAllStringSubmatch(line, -1)

		for _, r := range res {
			l, _ := strconv.Atoi(r[1])
			r, _ := strconv.Atoi(r[2])
			sum += l * r
		}
	}

	return sum
}

func part2(data []byte) interface{} {
	lines := strings.Split(string(data), "\n")
	pattern := regexp.MustCompile(`do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)`)
	sum := 0
	isSafe := true
	const DONT = "don't()"
	const DO = "do()"

	for _, line := range lines {
		res := pattern.FindAllStringSubmatch(line, -1)

		for _, r := range res {
			if r[0] == DONT {
				isSafe = false
				continue
			}

			if r[0] == DO {
				isSafe = true
				continue
			}

			if isSafe {
				l, _ := strconv.Atoi(r[1])
				r, _ := strconv.Atoi(r[2])
				sum += l * r
			}
		}
	}

	return sum
}
