// Taken from https://github.com/RobinMalfait/advent-of-code/blob/main/update-readme.js, all credits go to Robin.

import cheerio from "cheerio";
import fs from "node:fs/promises";
import path from "node:path";
import prettier from "prettier";

async function get(url) {
  try {
    const response = await fetch(`https://adventofcode.com${url}`, {
      headers: {
        cookie: process.env.AOC_COOKIE,
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${url}: ${error.message}`);
    throw error;
  }
}

async function getStars(year) {
  try {
    const contents = await get(`/${year}`);
    const starsByDay = new Map(
      Array.from({ length: 25 }, (_, i) => [i + 1, 0]),
    );
    const $ = cheerio.load(contents);
    for (const el of $('[aria-label^="Day "]')) {
      const label = el.attribs["aria-label"];
      const { groups } = /Day (?<day>\d+)(?:, (?<stars>one|two) stars?)?/g.exec(
        label,
      );
      starsByDay.set(
        Number(groups.day),
        groups.stars === "two" ? 2 : groups.stars === "one" ? 1 : 0,
      );
    }
    return Array.from(starsByDay.values());
  } catch (error) {
    console.error(`Error getting stars for year ${year}: ${error.message}`);
    throw error;
  }
}

function transpose(grid) {
  return grid[0].map((_, i) => grid.map((row) => row[i]));
}

async function main() {
  try {
    console.log("Starting update process...");
    const contents = await get(`/${new Date().getFullYear()}/events`);
    const $ = cheerio.load(contents);

    const totals = [];
    for await (const event of $(".eventlist-event")) {
      const year = Number(
        $(event).find("a:first-of-type").text().trim().slice(1, -1),
      );
      console.log(`Processing year ${year}...`);
      totals.push([year, ...(await getStars(year))]);
    }

    const data = transpose(totals.reverse());

    const output = [
      ["Day", ...data[0].map((year) => `[${year}][link-${year}]`)],
    ];
    output.push([":---:", ...data[0].map(() => ":---")]);

    for (const [idx, row] of data.slice(1).entries()) {
      output.push([
        `**${idx + 1}**`,
        ...row.map((stars) =>
          stars === 2 ? "⭐⭐" : stars === 1 ? "⭐" : " ",
        ),
      ]);
    }

    output.push([
      "**Total:**",
      ...data.slice(1).reduce(
        (acc, row) =>
          acc.map((v, i) => {
            const total = v + row[i];
            return total === 50 ? "**50**" : total;
          }),
        Array(data[0].length).fill(0),
      ),
    ]);

    const allStars = data
      .slice(1)
      .reduce((acc, row) => acc + row.reduce((acc, v) => acc + v, 0), 0);

    const markdown = `Total stars: **${allStars}**\n\n ${output
      .map((row) => `|${row.join(" | ")}|`)
      .join("\n")}\n\n${data[0]
      .map(
        (year) =>
          `[link-${year}]: https://github.com/ShubhamVerma1811/advent-of-code/tree/main/src/${year}`,
      )
      .join("\n")}`;

    const readme = path.join(process.cwd(), "README.md");
    let readmeContents = await fs.readFile(readme, "utf8");

    // Look for the "My AOC Stats" section to replace
    const markdownRegex = /## My AOC Stats[\s\S]*$/;
    if (markdownRegex.test(readmeContents)) {
      // Replace the stats section while keeping everything before it
      readmeContents = readmeContents.replace(
        markdownRegex,
        `## My AOC Stats\n\n${markdown}`,
      );
    } else {
      // If the section doesn't exist, append it at the end
      readmeContents += `\n\n## My AOC Stats\n\n${markdown}`;
    }

    await fs.writeFile(
      readme,
      await prettier.format(readmeContents, {
        parser: "markdown",
      }),
    );
    console.log("README.md updated successfully");
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    process.exit(1);
  }
}

main();
