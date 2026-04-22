import Arbol from "./controller/analizador/simbolo/Arbol"
import TablaSimbolo from "./controller/analizador/simbolo/tablaSimbolo"
import DeclaracionFuncion from "./controller/analizador/instrucciones/DeclaracionFuncion"
import LlamadaFuncion from "./controller/analizador/instrucciones/LlamadaFuncion"
import Declaracion from "./controller/analizador/instrucciones/Declaracion"
import DeclaracionCorta from "./controller/analizador/instrucciones/DeclaracionCorta"

class patronInterpreter {
    start(): any {
        try {
            let parser = require('./controller/analizador/analizador.js')

            let entrada = `
            func sumar(a int, b int) {
                var resultado int = a + b
                fmt.println(resultado)
            }

            func main() {
                sumar(10, 20)
            }
            `
            let ast = new Arbol(parser.parse(entrada))
            let tabla = new TablaSimbolo()

            ast.setTablaGlobal(tabla)
            ast.setConsola("")

            // Fase 1: Registro de funciones y variables globales
            for (let i of ast.getInstrucciones()) {
                if (i instanceof DeclaracionFuncion || i instanceof Declaracion || i instanceof DeclaracionCorta) {
                    i.interpretar(ast, tabla)
                }
            }

            // Fase 2: Ejecución de la función main
            let mainFunc = ast.getFuncion("main")
            if (mainFunc) {
                let llamadaMain = new LlamadaFuncion("main", [], mainFunc.linea, mainFunc.columna)
                let resultado = llamadaMain.interpretar(ast, tabla)
                if (resultado) console.log(resultado)
            } else {
                console.log("No se encontró la función main")
            }

            console.log("CONSOLA:")
            console.log(ast.getConsola())

        } catch (e: any) {
            console.log("Error en el interprete:")
            console.log(e)
        }
    }
}

export const interpreter = new patronInterpreter();
interpreter.start();