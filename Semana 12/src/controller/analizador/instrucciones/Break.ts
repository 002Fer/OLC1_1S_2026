import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class Break extends Instruccion {

    constructor(linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        return this;
    }
}
