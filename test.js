const  {resolve} = require("path");

const TJS = require("typescript-json-schema");

// optionally pass argument to schema generator
const settings= {
    required: true
};

// optionally pass ts compiler options
const compilerOptions = {
    strictNullChecks: true
}

// optionally pass a base path
const basePath = "./src/contracts/";

const files = [resolve("./src/contracts/"+"User.ts")]
const program = TJS.getProgramFromFiles(files, compilerOptions, basePath);
console.log(program)
const generator = TJS.buildGenerator(program, settings);

// all symbols
const symbols = program.getSourceFiles().map(f=>f.fileName).filter(f=>!/[.]d[.]ts$/.test(f));
console.log(symbols)
// Get symbols for different types from generator.
const x = generator.getSchemaForSymbol("User");
//generator.getSchemaForSymbol("AnotherType")

console.log(x)
