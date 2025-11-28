import fs from "node:fs/promises";
import path from "node:path";

async function ensureDirectoryExists(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
  }
}

async function setup() {
  try {
    console.log("🚀 Setting up Advent of Code project...");

    // Create necessary directories
    await ensureDirectoryExists(path.join(process.cwd(), "data"));
    await ensureDirectoryExists(
      path.join(process.cwd(), "node_modules/.cache/prettier"),
    );

    // Create .env file if it doesn't exist
    const envPath = path.join(process.cwd(), ".env");
    try {
      await fs.access(envPath);
      console.log("✅ .env file already exists");
    } catch {
      await fs.writeFile(
        envPath,
        "# Get your session cookie from browser dev tools after logging in to https://adventofcode.com\n" +
          "AOC_COOKIE=your_session_cookie_here\n",
        "utf8",
      );
      console.log("✅ Created .env file");
      console.log("ℹ️  Please update .env with your AOC session cookie");
    }

    console.log("\n✨ Setup complete! Next steps:");
    console.log("1. Update the AOC_COOKIE in .env file");
    console.log("2. Run `pnpm gen` to start a new puzzle");
    console.log("3. Run `pnpm format` to format your code");
  } catch (error) {
    console.error("❌ Setup failed:", error.message);
    process.exit(1);
  }
}

setup();
