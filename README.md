# Advent of Code Solutions

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/ShubhamVerma1811/advent-of-code.git
   cd advent-of-code
   ```

2. **Run the setup script**

   ```bash
   pnpm install
   pnpm setup
   ```

   This will:

   - Create necessary directories
   - Set up a `.env` file with instructions
   - Print next steps

3. **Get your session cookie**
   - Log in to [Advent of Code](https://adventofcode.com)
   - Open browser developer tools (F12) → Network tab
   - Refresh the page
   - Find any request to adventofcode.com and copy the `session` cookie
   - Paste it in the `.env` file:
     ```
     AOC_COOKIE=your_session_cookie_here
     ```

## 🛠 Usage

### Starting a New Puzzle

```bash
# Clean any existing solutions (optional)
pnpm clean

# Generate files for today's puzzle
pnpm gen

# Or specify day and year
pnpm gen <day> <year>
# Example: pnpm gen 1 2023
```

This will:

- Create a new directory at `src/<year>/day-<day>`
- Generate template files for TypeScript and Go
- Create test files with sample input
- Download your puzzle input to `data/<year>-<day>.txt`

### Formatting Your Code

```bash
pnpm format
```

### Updating Stats

To update your AoC stats in the README:

```bash
pnpm update-stats
```

## Adding Support for More Languages

You can add support for additional programming languages by following these steps:

1. Create a new directory under `templates/day/` for your language (e.g., `python/`)
2. Add your template files in that directory
3. Update `scripts/generate.js` to include your language in the `replacements` object:
   ```javascript
   const replacements = {
     // ... existing entries
     "your-language/your-template-file": values,
   };
   ```
4. The script will automatically replace any `{{DAY}}` and `{{YEAR}}` placeholders in your template files
5. Make sure to update the `copy` function if your language requires any special file handling

For example, to add Python support:

1. Create `templates/day/python/solution.py` with your Python template
2. Add the following to the replacements object in `generate.js`:

   ```javascript
   'python/solution.py': values,
   ```

3. **Format your code**

   ```bash
   pnpm format
   ```

4. **Clean up** (if needed)
   ```bash
   pnpm clean  # Removes everything in the src directory
   ```

## My AOC Stats

Total stars: **29**

|    Day     | [2015][link-2015] | [2016][link-2016] | [2017][link-2017] | [2018][link-2018] | [2019][link-2019] | [2020][link-2020] | [2021][link-2021] | [2022][link-2022] | [2023][link-2023] | [2024][link-2024] |
| :--------: | :---------------- | :---------------- | :---------------- | :---------------- | :---------------- | :---------------- | :---------------- | :---------------- | :---------------- | :---------------- |
|   **1**    | ⭐⭐              |                   |                   |                   |                   |                   |                   |                   | ⭐⭐              | ⭐⭐              |
|   **2**    | ⭐⭐              |                   |                   |                   |                   |                   |                   |                   | ⭐⭐              | ⭐⭐              |
|   **3**    |                   |                   |                   |                   |                   |                   |                   |                   | ⭐⭐              | ⭐⭐              |
|   **4**    | ⭐⭐              |                   |                   |                   |                   |                   |                   |                   | ⭐⭐              | ⭐⭐              |
|   **5**    |                   |                   |                   |                   |                   |                   |                   |                   | ⭐                | ⭐⭐              |
|   **6**    |                   |                   |                   |                   |                   |                   |                   |                   | ⭐⭐              | ⭐                |
|   **7**    |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
|   **8**    |                   |                   |                   |                   |                   |                   |                   |                   | ⭐                |                   |
|   **9**    |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
|   **10**   |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
|   **11**   |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
|   **12**   |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
|   **13**   |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
|   **14**   |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
|   **15**   |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
|   **16**   |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
|   **17**   |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
|   **18**   |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
|   **19**   |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
|   **20**   |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
|   **21**   |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
|   **22**   |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
|   **23**   |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
|   **24**   |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
|   **25**   |                   |                   |                   |                   |                   |                   |                   |                   |                   |                   |
| **Total:** | 6                 | 0                 | 0                 | 0                 | 0                 | 0                 | 0                 | 0                 | 12                | 11                |

[link-2015]: https://github.com/ShubhamVerma1811/advent-of-code/tree/main/src/2015
[link-2016]: https://github.com/ShubhamVerma1811/advent-of-code/tree/main/src/2016
[link-2017]: https://github.com/ShubhamVerma1811/advent-of-code/tree/main/src/2017
[link-2018]: https://github.com/ShubhamVerma1811/advent-of-code/tree/main/src/2018
[link-2019]: https://github.com/ShubhamVerma1811/advent-of-code/tree/main/src/2019
[link-2020]: https://github.com/ShubhamVerma1811/advent-of-code/tree/main/src/2020
[link-2021]: https://github.com/ShubhamVerma1811/advent-of-code/tree/main/src/2021
[link-2022]: https://github.com/ShubhamVerma1811/advent-of-code/tree/main/src/2022
[link-2023]: https://github.com/ShubhamVerma1811/advent-of-code/tree/main/src/2023
[link-2024]: https://github.com/ShubhamVerma1811/advent-of-code/tree/main/src/2024
