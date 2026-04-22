import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";

export default class CondicionalIf extends Instruccion {
    private condicion: Instruccion;
    private instruccionesIf: Instruccion[];
    private instruccionesElse: Instruccion[] | undefined;

    constructor(
        condicion: Instruccion, 
        instruccionesIf: Instruccion[], 
        instruccionesElse: Instruccion[] | undefined, 
        linea: number, 
        columna: number
    ) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.instruccionesIf = instruccionesIf;
        this.instruccionesElse = instruccionesElse;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof Errores) return cond;

        if (this.condicion.tipoDato.getTipo() !== tipoDato.BOOLEAN) {
            return new Errores("Semantico", "La condicion del if debe ser booleana", this.linea, this.columna);
        }

        if (cond) {
            let tablaLocal = new TablaSimbolo(tabla);
            for (let i of this.instruccionesIf) {
                if (i instanceof Instruccion) {
                    let res = i.interpretar(arbol, tablaLocal);
                    if (res instanceof Errores) return res;
                    if (res instanceof Break) return res;
                }
            }
        } else {
            if (this.instruccionesElse != undefined) {
                let tablaLocal = new TablaSimbolo(tabla);
                for (let i of this.instruccionesElse) {
                    if (i instanceof Instruccion) {
                        let res = i.interpretar(arbol, tablaLocal);
                        if (res instanceof Errores) return res;
                        if (res instanceof Break) return res;
                    }
                }
            }
        }
    }
}
