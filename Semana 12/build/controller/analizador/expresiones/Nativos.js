"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
class Nativo extends Instruccion_1.Instruccion {
    constructor(tipo, valor, linea, columna) {
        super(tipo, linea, columna);
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        return this.valor;
    }
}
exports.default = Nativo;
