const fs = require("fs");
const jison = require("jison");

const grammar = fs.readFileSync("calculadora.jison", "utf8");

const parser = new jison.Parser(grammar);

fs.writeFileSync("parser.js", parser.generate());

console.log("Parser generado correctamente");