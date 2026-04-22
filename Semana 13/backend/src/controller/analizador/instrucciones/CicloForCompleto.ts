import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";

export default class CicloForCompleto extends Instruccion {
    private inicializacion: Instruccion;
    private condicion: Instruccion;
    private actualizacion: Instruccion;
    private instrucciones: Instruccion[];

    constructor(
        inicializacion: Instruccion, 
        condicion: Instruccion, 
        actualizacion: Instruccion, 
        instrucciones: Instruccion[], 
        linea: number, 
        columna: number
    ) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.inicializacion = inicializacion;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.instrucciones = instrucciones;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        // Creamos un nuevo entorno para el ciclo
        let tablaLocal = new TablaSimbolo(tabla);

        // 1. Ejecutar inicialización en el nuevo entorno
        let init = this.inicializacion.interpretar(arbol, tablaLocal);
        if (init instanceof Errores) return init;

        // 2. Bucle
        while (true) {
            // Evaluamos la condición
            let cond = this.condicion.interpretar(arbol, tablaLocal);
            if (cond instanceof Errores) return cond;

            if (this.condicion.tipoDato.getTipo() !== tipoDato.BOOLEAN) {
                return new Errores("Semantico", "La condicion del for debe ser booleana", this.linea, this.columna);
            }

            // Si es falso, salimos
            if (!cond) break;

            // Ejecutamos instrucciones del bloque
            // El cuerpo del ciclo tiene su propio scope heredado de tablaLocal (que tiene i)
            let tablaCuerpo = new TablaSimbolo(tablaLocal);
            for (let i of this.instrucciones) {
                if (i instanceof Instruccion) {
                    let res = i.interpretar(arbol, tablaCuerpo);
                    if (res instanceof Errores) return res;
                    if (res instanceof Break) return null;
                }
            }

            // Ejecutamos la actualización
            let update = this.actualizacion.interpretar(arbol, tablaLocal);
            if (update instanceof Errores) return update;
        }
        
        return null;
    }
}
