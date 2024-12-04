package main

import (
	"fmt"
	"math"
	"os"
	"sort"
	"strconv"
	"strings"
	"time"
)

func main() {

	data, err := os.ReadFile("../../../../data/2024-01.txt")
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

	lines := strings.Split(string(strings.Trim(string(data), "\n")), "\n")

	left := make([]int, 0)
	right := make([]int, 0)
	distance := 0

	for _, line := range lines {
		x := strings.Split(line, "   ")
		l, _ := strconv.Atoi(x[0])
		r, _ := strconv.Atoi(x[1])
		left = append(left, l)
		right = append(right, r)
	}

	sort.Ints((left))
	sort.Ints((right))

	for k := range left {
		distance += int(math.Abs(float64(left[k] - right[k])))
	}

	return distance
}

func part2(data []byte) interface{} {
	lines := strings.Split(string(strings.Trim(string(data), "\n")), "\n")

	left := make([]int, 0)
	rightMap := make(map[int]int)
	res := 0

	for _, line := range lines {
		x := strings.Split(line, "   ")
		l, _ := strconv.Atoi(x[0])
		r, _ := strconv.Atoi(x[1])
		left = append(left, l)
		rightMap[r] = rightMap[r] + 1
	}

	for _, l := range left {
		res += l * rightMap[l]
	}

	return res
}
