"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpreter = void 0;
const Arbol_1 = __importDefault(require("./controller/analizador/simbolo/Arbol"));
const tablaSimbolo_1 = __importDefault(require("./controller/analizador/simbolo/tablaSimbolo"));
class patronInterpreter {
    start() {
        try {
            let parser = require('./controller/analizador/analizador.js');
            let entrada = `

            
               for i := 1; i < 10; i += 1 {
                   if i == 5 {
                       break
                   }
                   fmt.println(i)
               }
            `;
            let ast = new Arbol_1.default(parser.parse(entrada));
            let tabla = new tablaSimbolo_1.default();
            ast.setTablaGlobal(tabla);
            ast.setConsola("");
            for (let i of ast.getInstrucciones()) {
                let resultado = i.interpretar(ast, tabla);
                if (resultado)
                    console.log(resultado);
            }
            console.log("CONSOLA:");
            console.log(ast.getConsola());
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.interpreter = new patronInterpreter();
exports.interpreter.start();
