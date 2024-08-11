const fs = require("fs");

const args = process.argv;

if (
    args.length !== 4 ||
    (args[2] !== "-c" && args[2] !== "-l" && args[2] !== "-w" && args[2] !== "-m")
) {
    console.error("Usage: node ccwc.js -c");
    process.exit(1);
}

const option = args[2];
const fileName = args[3];

fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
        process.stderr.write(`Error: ${err.message}\n`);
        process.exit(1);
    }
    let byteCount = 0,
        numberOfLines = 0,
        numberOfWords = 0,
        characterCount = 0
    switch (option) {
        case "-c":
            byteCount = Buffer.byteLength(data, 'utf-8')
            console.log(`${byteCount} ${fileName}`);
            break;
        case "-l":
            numberOfLines = data.split("\n").length;
            console.log(`${numberOfLines} ${fileName}`);
            break;
        case "-w":
            const trimmedText = data.trim();
            const wordArray = trimmedText.split(/\s+/);
            numberOfWords = wordArray.length;
            console.log(`${numberOfWords} ${fileName}`);
            break;
        case "-m":
            characterCount = data.length;
            console.log(`${characterCount} ${fileName}`);
            break;
        default:
            console.error("Invalid option");
            process.exit(1)

    }
});
