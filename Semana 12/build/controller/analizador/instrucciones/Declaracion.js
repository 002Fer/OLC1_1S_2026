"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Simbolo_1 = __importDefault(require("../simbolo/Simbolo"));
class Declaracion extends Instruccion_1.Instruccion {
    constructor(tipo, linea, columna, id, valor) {
        super(tipo, linea, columna);
        this.id = id;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        if (this.valor == null) {
            if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.id, null))) {
                return new Errores_1.default('SEMANTICO', 'No se puede declarar la variable', this.linea, this.columna);
            }
            return;
        }
        let resValor = this.valor.interpretar(arbol, tabla);
        if (resValor instanceof Errores_1.default)
            return resValor;
        if (this.tipoDato.getTipo() != this.valor.tipoDato.getTipo()) {
            return new Errores_1.default("Semantico", `Error de tipo en la declaracion de la variable ${this.id}, esperado ${this.tipoDato.getTipo()} pero obtenido ${this.valor.tipoDato.getTipo()}`, this.linea, this.columna);
        }
        if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.id, resValor))) {
            return new Errores_1.default("Semantico", "Error de variable ya existe en el entorno", this.linea, this.columna);
        }
        return null;
    }
}
exports.default = Declaracion;
