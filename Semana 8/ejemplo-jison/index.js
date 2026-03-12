const parser = require("./parser");

const expresion = "5 + 3 * 2";

const resultado = parser.parse(expresion);

console.log("Expresión:", expresion);
console.log("Resultado:", resultado);