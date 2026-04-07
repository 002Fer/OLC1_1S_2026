import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import TablaSimbolo from "../simbolo/tablaSimbolo";
import  Tipo, {tipoDato}  from "../simbolo/Tipo";


export default class Declaracion extends Instruccion{
    private id: string
    private valor: Instruccion|null
    

    constructor(tipo:Tipo, linea:number, columna: number, id:string, valor: Instruccion){
        super(tipo,linea, columna);
        this.id=id
        this.valor= valor
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        if(this.valor ==null){
            if(!tabla.setVariable(new Simbolo(this.tipoDato,this.id,null))){
                return new Errores ('SEMANTICO', 'No se puede declarar la variable',this.linea, this.columna)
            }
            return;
        }
        let resValor=this.valor.interpretar(arbol,tabla)
        if(resValor instanceof Errores) return resValor

        if(this.tipoDato.getTipo() != this.tipoDato.getTipo()){
            return new Errores("Semantico", "Error de tipo en la declaracion de la variable, no son del mismo tipo", this.linea, this.columna);
        }

        if(!tabla.setVariable(new Simbolo(this.tipoDato,this.id,resValor))) {
            return new Errores("Semantico", "Error de variable ya existe en el entorno", this.linea, this.columna);
        }
        return null
        
    }
}