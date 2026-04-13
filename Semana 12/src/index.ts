import Arbol from "./controller/analizador/simbolo/Arbol"
import TablaSimbolo from "./controller/analizador/simbolo/tablaSimbolo"

class patronInterpreter {
    start(): any {
        try {
            let parser = require('./controller/analizador/analizador.js')

            let entrada = `
               var a int = 10
                fmt.println(5 + a )
            `

            let ast = new Arbol(parser.parse(entrada))
            let tabla = new TablaSimbolo()

            ast.setTablaGlobal(tabla)
            ast.setConsola("")

            for (let i of ast.getInstrucciones()) {
                let resultado = i.interpretar(ast, tabla)
                if (resultado) console.log(resultado)
            }

            console.log("CONSOLA:")
            console.log(ast.getConsola())

            console.log("TABLA:")
            console.log(tabla)

        } catch (e: any) {
            console.log(e)
        }
    }
}

export const interpreter = new patronInterpreter();
interpreter.start();