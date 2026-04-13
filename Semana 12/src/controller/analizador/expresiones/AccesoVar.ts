import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import TablaSimbolo from "../simbolo/tablaSimbolo";
import  Tipo, {tipoDato}  from "../simbolo/Tipo";


//var a entero= 10

//print(a)
export default class AccesoVar extends Instruccion{
    private id:string

    constructor(id:string,linea:number,columna:number){

        super(new Tipo(tipoDato.VOID),linea,columna)
        this.id=id
    }
        

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valor=tabla.getVariable(this.id)

        if(valor==null){
            return new Errores("Semantico","No se puede acceder al valor de esta variable",this.linea,this.columna)
        }

        this.tipoDato=valor.getTipo()

        return valor.getValor()
    }

}