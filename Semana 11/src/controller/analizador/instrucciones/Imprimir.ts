import { execPath } from "process";
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import TablaSimbolo from "../simbolo/tablaSimbolo";
import  Tipo, {tipoDato}  from "../simbolo/Tipo";

//print(    cadena|suma|resta|entero|decimal)

export default class Imprimir extends Instruccion{

    private expresion:Instruccion

    constructor( expresion:Instruccion,linea:number, columna:number){
        super(new Tipo(tipoDato.VOID),linea, columna)
        this.expresion=expresion
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let resValor=this.expresion.interpretar(arbol,tabla)

        if (resValor instanceof Errores) return resValor

        arbol.Print(resValor)
    }

}