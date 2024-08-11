const fs = require("fs")

const args = process.argv;

if(args.length !== 4 || args[2] !== '-c'){
    console.error("Usage: node ccwc.js -c");
    process.exit(1)
}

const option = args[2];
const fileName = args[3];

fs.readFile(fileName, 'utf-8', (err, data) => {
    if(err){
        process.stderr.write(`Error: ${err.message}\n`);
        process.exit(1);
    }
    switch(option){
        case '-c':
            const byteCount = data.length;
            console.log(`${byteCount} ${fileName}`)
    }
})
