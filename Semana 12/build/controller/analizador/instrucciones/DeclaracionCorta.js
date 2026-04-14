"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Simbolo_1 = __importDefault(require("../simbolo/Simbolo"));
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
class DeclaracionCorta extends Instruccion_1.Instruccion {
    constructor(id, valor, linea, columna) {
        // Inicialmente el tipo es VOID, se inferirá en interpretar
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, columna);
        this.id = id;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        // 1. Interpretar la expresión
        let resValor = this.valor.interpretar(arbol, tabla);
        if (resValor instanceof Errores_1.default)
            return resValor;
        // 2. Obtener el tipo de la expresión
        this.tipoDato = this.valor.tipoDato;
        // 3. Crear el símbolo y guardarlo en la tabla
        let nuevoSimbolo = new Simbolo_1.default(this.tipoDato, this.id, resValor);
        if (!tabla.setVariable(nuevoSimbolo)) {
            return new Errores_1.default("Semantico", `La variable '${this.id}' ya ha sido declarada anteriormente`, this.linea, this.columna);
        }
        return null;
    }
}
exports.default = DeclaracionCorta;
