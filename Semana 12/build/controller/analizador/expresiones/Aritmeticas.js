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
exports.OperadoresAritmeticos = void 0;
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
class Aritmeticas extends Instruccion_1.Instruccion {
    constructor(operador, linea, columna, operando1, operando2) {
        super(new Tipo_1.default(Tipo_1.tipoDato.ENTERO), linea, columna);
        this.operador = operador;
        if (!operando2)
            this.operadorUnico = operando1;
        else {
            this.operando1 = operando1;
            this.operando2 = operando2;
        }
    }
    interpretar(arbol, tabla) {
        var _a, _b;
        let opIzq, opDer, Unico = null;
        if (this.operadorUnico != null) {
            Unico = this.operadorUnico.interpretar(arbol, tabla);
        }
        else {
            opIzq = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla);
            if (opIzq instanceof Errores_1.default)
                return opIzq;
            opDer = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.interpretar(arbol, tabla);
            if (opDer instanceof Errores_1.default)
                return opIzq;
            switch (this.operador) {
                case OperadoresAritmeticos.SUMA:
                    return this.suma(opIzq, opDer);
                case OperadoresAritmeticos.RESTA:
                    return this.resta(opIzq, opDer);
                case OperadoresAritmeticos.NEG:
                    return this.negacion(Unico);
            }
        }
    }
    suma(op1, op2) {
        var _a, _b;
        let tipo1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let tipo2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) + parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) + parseFloat(op2);
                    default:
                        return new Errores_1.default("Semantico", "suma entre operadores no existe", this.linea, this.columna);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        return parseFloat(op1) + parseFloat(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) + parseFloat(op2);
                    default:
                        return new Errores_1.default("Semantico", "suma entre operadores no existe", this.linea, this.columna);
                }
        }
    }
    resta(op1, op2) {
        var _a, _b;
        let tipo1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let tipo2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) - parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) - parseFloat(op2);
                    default:
                        return new Errores_1.default("Semantico", "suma entre operadores no existe", this.linea, this.columna);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        return parseFloat(op1) - parseFloat(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) - parseFloat(op2);
                    default:
                        return new Errores_1.default("Semantico", "suma entre operadores no existe", this.linea, this.columna);
                }
        }
    }
    negacion(op1) {
        var _a;
        let opU = (_a = this.operadorUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (opU) {
            case Tipo_1.tipoDato.ENTERO:
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                return parseInt(op1) * -1;
            case Tipo_1.tipoDato.DECIMAL:
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                return parseFloat(op1) * -1;
            default:
                return new Errores_1.default("Semantico", "Negacion Unaria invalida", this.linea, this.columna);
        }
    }
}
exports.default = Aritmeticas;
var OperadoresAritmeticos;
(function (OperadoresAritmeticos) {
    OperadoresAritmeticos[OperadoresAritmeticos["SUMA"] = 0] = "SUMA";
    OperadoresAritmeticos[OperadoresAritmeticos["RESTA"] = 1] = "RESTA";
    OperadoresAritmeticos[OperadoresAritmeticos["NEG"] = 2] = "NEG";
})(OperadoresAritmeticos || (exports.OperadoresAritmeticos = OperadoresAritmeticos = {}));
