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
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
const Break_1 = __importDefault(require("./Break"));
class CicloForCompleto extends Instruccion_1.Instruccion {
    constructor(inicializacion, condicion, actualizacion, instrucciones, linea, columna) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, columna);
        this.inicializacion = inicializacion;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.instrucciones = instrucciones;
    }
    interpretar(arbol, tabla) {
        // 1. Ejecutar inicialización
        let init = this.inicializacion.interpretar(arbol, tabla);
        if (init instanceof Errores_1.default)
            return init;
        // 2. Bucle
        while (true) {
            // Evaluamos la condición
            let cond = this.condicion.interpretar(arbol, tabla);
            if (cond instanceof Errores_1.default)
                return cond;
            if (this.condicion.tipoDato.getTipo() !== Tipo_1.tipoDato.BOOLEAN) {
                return new Errores_1.default("Semantico", "La condicion del for debe ser booleana", this.linea, this.columna);
            }
            // Si es falso, salimos
            if (!cond)
                break;
            // Ejecutamos instrucciones del bloque
            for (let i of this.instrucciones) {
                if (i instanceof Instruccion_1.Instruccion) {
                    let res = i.interpretar(arbol, tabla);
                    if (res instanceof Errores_1.default)
                        return res;
                    if (res instanceof Break_1.default)
                        return null;
                }
            }
            // Ejecutamos la actualización
            let update = this.actualizacion.interpretar(arbol, tabla);
            if (update instanceof Errores_1.default)
                return update;
        }
        return null;
    }
}
exports.default = CicloForCompleto;
