import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";

export default class CicloFor extends Instruccion {
    private condicion: Instruccion;
    private instrucciones: Instruccion[];

    constructor(condicion: Instruccion, instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof Errores) return cond;

        if (this.condicion.tipoDato.getTipo() !== tipoDato.BOOLEAN) {
            return new Errores("Semantico", "La condicion del for debe ser booleana", this.linea, this.columna);
        }

        while (this.condicion.interpretar(arbol, tabla)) {
            // Creamos un nuevo entorno opcionalmente si queremos scope local en el for
            // Pero según los ejemplos, parece que se usa el entorno actual.
            // Si el usuario requiere scope de bloque, se debería crear una nueva TablaSimbolo.
            for (let i of this.instrucciones) {
                if (i instanceof Instruccion) {
                    let res = i.interpretar(arbol, tabla);
                    if (res instanceof Errores) return res;
                    if (res instanceof Break) return null;
                }
            }
        }
        return null;
    }
}
