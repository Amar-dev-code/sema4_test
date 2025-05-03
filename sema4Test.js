// /*
// - When the program runs it should accept two arguments. input file and output file . Write validations that it should accept correct
// arguments.
// - Read the file synchronusly as we have one single file .if multiple files then , may be async would be better option.
// - read file and put in an array .
// - multiples can be always result + number . example if 3 then result will be 3 , then 3+3 , 6+3 till goal-1 .
// - we are usinng set to make sure we have unique multipliers for example if x is 2 and y is 3 , goal is 10 then 6 is a multuiple of
// both 2 and 3 . so rather than having 6 twice we have it once.
// - for sorting we are using the length of the multiples of every line and printimg it.
//  */

const fs = require("fs");

// Ensuring correct number of arguments
if (process.argv.length !== 4) {
  console.error("Please pass correct number of arguments");
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];

// Reading and processing input file
try {
  const input = fs.readFileSync(inputFile, "utf-8");
  const lines = input.trim().split("\n");

  const results = lines.map((line, index) => {
    const [xStr, yStr, goalStr] = line.trim().split(/\s+/);
    const x = parseInt(xStr, 10);
    const y = parseInt(yStr, 10);
    const goal = parseInt(goalStr, 10);

    const multiplesSet = new Set();

    for (let i = x; i < goal; i += x) {
      multiplesSet.add(i);
    }
    for (let i = y; i < goal; i += y) {
      multiplesSet.add(i);
    }

    const sortedMultiples = [...multiplesSet].sort((a, b) => a - b);

    return {
      goal,
      multiples: sortedMultiples,
      count: sortedMultiples.length,
    };
  });

  // Sorting results by count of multiples (ascending)
  results.sort((a, b) => a.count - b.count);

  // Preparing output content
  const output = results
    .map((r) => `${r.goal}: ${r.multiples.join(" ")}`)
    .join("\n");

  console.log(output);

  // Writing to output file
  fs.writeFileSync(outputFile, output, "utf-8");
  console.log(`\nResults written to ${outputFile}`);
} catch (err) {
  console.error("Error:", err.message);
  process.exit(1);
}
