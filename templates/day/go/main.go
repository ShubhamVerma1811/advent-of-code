package main

import (
	"fmt"
	"os"
	"time"
)

func main() {

	data, err := os.ReadFile("../../../../data/{{YEAR}}-{{DAY}}.txt")
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
	return nil
}

func part2(data []byte) interface{} {
	return nil
}
