package main

import (
	"fmt"
	"io"
	"os"
	"strings"
	"time"
)

func main() {

	file, err := os.Open("../../../../data/2015-01.txt")
	if err != nil {
		panic(err)
	}

	defer file.Close()

	data, err := io.ReadAll(file)

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

func part1(data []byte) int {
	var sum int

	for _, v := range data {
		if strings.Trim(string(v), "") == "(" {
			sum++
		} else {
			sum--
		}
	}

	return sum
}

func part2(data []byte) interface{} {
	var sum int

	for i, v := range data {
		if strings.Trim(string(v), "") == "(" {
			sum++
		} else {
			sum--
		}

		if sum < 0 {
			return i + 1
		}
	}

	return nil

}
