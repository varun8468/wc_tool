const fs = require("fs");

const args = process.argv;

console.log(args.length)

if (args.length < 3 || args.length > 4) {
    console.error("Usage: node ccwc.js [-c|-l|-w|-m] filename");
    process.exit(1);
}

const option = args.length === 4 ? args[2] : null;
const fileName = args.length === 4 ? args[3] : args[2];

if (option && !["-c", "-l", "-w", "-m"].includes(option)) {
    console.error("Invalid option. Usage: node ccwc.js [-c|-l|-w|-m] filename");
    process.exit(1);
}

fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
        process.stderr.write(`Error: ${err.message}\n`);
        process.exit(1);
    }
    let byteCount = 0,
        numberOfLines = 0,
        numberOfWords = 0,
        characterCount = 0;
    const trimmedText = data.trim();
    const wordArray = trimmedText.split(/\s+/);
    switch (option) {
        case "-c":
            byteCount = Buffer.byteLength(data, "utf-8");
            console.log(`${byteCount} ${fileName}`);
            break;
        case "-l":
            numberOfLines = data.split("\n").length;
            console.log(`${numberOfLines} ${fileName}`);
            break;
        case "-w":
            numberOfWords = wordArray.length;
            console.log(`${numberOfWords} ${fileName}`);
            break;
        case "-m":
            characterCount = data.length;
            console.log(`${characterCount} ${fileName}`);
            break;
        default:
            byteCount = Buffer.byteLength(data, "utf-8");
            numberOfLines = data.split("\n").length;
            numberOfWords = wordArray.length;
            characterCount = data.length;
            console.log(
                `${byteCount} ${numberOfLines} ${numberOfWords} ${characterCount} ${fileName}`
            );
    }
});
