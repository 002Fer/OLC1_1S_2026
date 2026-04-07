import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, {tipoDato} from "../simbolo/Tipo";


//var id1 entero = 10
//id = expresion   | hola

export default class AsignacionVar extends Instruccion{
    private id:string
    private expresion:Instruccion

    constructor(id:string,expresion:Instruccion, linea:number, columna:number ){
        super(new Tipo(tipoDato.VOID),linea,columna)
        this.id=id
        this.expresion=expresion
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let varibale= tabla.getVariable(this.id)
        if (varibale == null){
            return new Errores("Semantico", "La variable no existe", this.linea, this.columna)
        }

        let newValor=this.expresion.interpretar(arbol,tabla)
        if (newValor instanceof Errores) return newValor

        if(this.expresion.tipoDato.getTipo() != varibale.getTipo().getTipo()){
            return new Errores("Semantico", "Los tipos deben de ser iguales", this.linea, this.columna)
        }

        this.tipoDato=varibale.getTipo()
        varibale.setValor(newValor)
    }

}