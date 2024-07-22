/*
  This setup is inspiried from https://github.com/RobinMalfait/advent-of-code
 */

import fs from 'node:fs';
import path from 'node:path';

const day = (process.argv[2] ?? new Date().getDate().toString()).padStart(
  2,
  '0'
);
const year = process.argv[3] ?? new Date().getFullYear().toString();

function data(...paths) {
  return path.resolve(process.cwd(), 'data', ...paths);
}

function destYear(...paths) {
  return path.resolve(process.cwd(), 'src', year, ...paths);
}

function destDay(...paths) {
  return destYear(`day-${day}`, ...paths);
}

function template(...paths) {
  return path.resolve(process.cwd(), 'templates', ...paths);
}

if (fs.existsSync(destDay())) {
  throw new Error(
    `Watch out! "${path.resolve(process.cwd(), destDay())}" already exists!`
  );
}

await fs.promises.mkdir(destDay(), { recursive: true });

async function copy(src, dst) {
  const stat = await fs.promises.stat(src);

  if (stat.isDirectory()) {
    await fs.promises.mkdir(dst, { recursive: true });
  }

  if (stat.isDirectory()) {
    const files = await fs.promises.readdir(src, { withFileTypes: true });
    await Promise.all(
      files.map((dirent) =>
        copy(path.resolve(src, dirent.name), path.resolve(dst, dirent.name))
      )
    );
  }

  if (stat.isFile()) {
    await fs.promises.copyFile(src, dst);
  }
}

// Copy the files from the year template
if (!fs.existsSync(destYear('package.json'))) {
  await copy(template('year'), destYear());

  const replacements = {
    'package.json': {
      YEAR: year,
    },
    'README.md': {
      YEAR: year,
    },
  };

  for (const file in replacements) {
    let contents = await fs.promises.readFile(
      destYear(...file.split('/')),
      'utf8'
    );
    for (const [key, value] of Object.entries(replacements[file])) {
      contents = contents.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    await fs.promises.writeFile(destYear(file), contents, 'utf8');
  }
}

async function fetchAndWriteInput({ year, day }) {
  const response = await fetch(
    `https://adventofcode.com/${year}/day/${Number(day)}/input`,
    {
      headers: {
        cookie: process.env.AOC_COOKIE,
      },
    }
  );
  const contents = await response.text();

  await fs.promises.writeFile(data(`${year}-${day}.txt`), contents, 'utf8');
}

// Copy the files from the day template
await copy(template('day'), destDay());

const values = {
  DAY: day,
  YEAR: year,
};

// Replace the constants
const replacements = {
  'typescript/index.test.ts': values,
  'typescript/index.ts': values,
  'rust/src/main.rs': values,
  'rust/Cargo.toml': values,
  // 'rust/Cargo.lock': values,
  'go/main.go': values,
  'go/go.mod': values,
  'java/Main.java': values,
};

for (const file in replacements) {
  let contents = await fs.promises.readFile(
    destDay(...file.split('/')),
    'utf8'
  );

  for (const [key, value] of Object.entries(replacements[file])) {
    contents = contents.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  await fs.promises.writeFile(destDay(file), contents, 'utf8');
}

fetchAndWriteInput({ year, day });
