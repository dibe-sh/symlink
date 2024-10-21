const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const sourceEnvPath = path.resolve(__dirname, "./.env"); // Root-level .env file
const targetEnvPath = [
    path.resolve(__dirname, "./apps/backend/.env"), // Backend .env file
    path.resolve(__dirname, "./apps/frontend/.env"), // frontend .env file
    path.resolve(__dirname, "./apps/extra/.env"), // extra .env file
];

// Check if symlink already exists
targetEnvPath.forEach((path) => {
    if (fs.existsSync(path)) {
        if (fs.lstatSync(path).isSymbolicLink()) {
            console.log(`Symlink already exists: ${path}`);
        } else {
            console.log(
                `A file or folder exists at ${path}, cannot create symlink.`
            );
        }
    } else {
        // Create symlink
        try {
            if (process.platform === "win32") {
                execSync(`mklink "${path}" "${sourceEnvPath}"`, {
                    stdio: "inherit",
                });
                console.log("Symlink created on Windows");
            } else {
                execSync(`ln -s "${sourceEnvPath}" "${path}"`, {
                    stdio: "inherit",
                });
                console.log("Symlink created on Unix-like system");
            }
        } catch (err) {
            console.error("Error creating symlink:", err.message);
        }
    }
});
