import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, {tipoDato} from "../simbolo/Tipo";


export default class Nativo extends Instruccion {

    valor:any

    constructor (tipo:Tipo, valor:any, linea:number, columna:number){
        super(tipo,linea,columna)
        this.valor=valor;

    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        return this.valor
    }
}
