
import Arbol from "./controller/analizador/simbolo/Arbol"
import TablaSimbolo from "./controller/analizador/simbolo/tablaSimbolo"

class patronInterpreter{
    start():any{
        try{
            let parser =require('./controllers/analizador/analizador.js')
            //let parser =require('./controllers/analizador/analizador.js')
            let ast= new Arbol(parser.parse('2+2+5;'))
            let tabla= new TablaSimbolo()
            ast.setTablaGlobal(tabla)
            ast.setConsola("")


            for(let i of ast.getInstrucciones()){
                var resultado=i.interpretar(ast,tabla)
                console.log(resultado)
            }
            console.log(tabla)
        }catch(e:any){
            console.log(e)
        }
    }
}

export const interpreter= new patronInterpreter();
interpreter.start();