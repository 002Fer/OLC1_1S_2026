import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import TablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";

export default class LlamadaFuncion extends Instruccion {
    private nombre: string;
    private argumentos: Array<Instruccion>;

    constructor(nombre: string, argumentos: Array<Instruccion>, linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.nombre = nombre;
        this.argumentos = argumentos;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        // 1. Buscar la función
        let funcion = arbol.getFuncion(this.nombre);
        if (funcion == null) {
            return new Errores("Semantico", `La funcion '${this.nombre}' no existe`, this.linea, this.columna);
        }

        // 2. Crear nuevo entorno (Hereda del Global para evitar scope dinámico)
        let tablaLocal = new TablaSimbolo(arbol.getTablaGlobal());
        tablaLocal.setNombreDato(this.nombre);

        // 3. Validar parámetros y argumentos
        let parametros = funcion.getParametros();
        if (parametros.length !== this.argumentos.length) {
            return new Errores("Semantico", `Cantidad de argumentos incorrecta para '${this.nombre}'`, this.linea, this.columna);
        }

        // 4. Evaluar argumentos y guardarlos en local
        for (let i = 0; i < parametros.length; i++) {
            let valorArg = this.argumentos[i].interpretar(arbol, tabla); // Los argumentos se evalúan en el entorno llamador
            if (valorArg instanceof Errores) return valorArg;

            // Validar tipo
            if (this.argumentos[i].tipoDato.getTipo() !== parametros[i].tipo.getTipo()) {
                return new Errores("Semantico", `Tipo de argumento incorrecto para el parametro '${parametros[i].id}'`, this.linea, this.columna);
            }

            // Registrar en tabla local
            let nuevoSimbolo = new Simbolo(parametros[i].tipo, parametros[i].id, valorArg);
            if (!tablaLocal.setVariable(nuevoSimbolo)) {
                return new Errores("Semantico", `Error al asignar parametro '${parametros[i].id}'`, this.linea, this.columna);
            }
        }

        // 5. Ejecutar instrucciones
        let instrucciones = funcion.getInstrucciones();
        for (let i of instrucciones) {
            if (i instanceof Instruccion) {
                let res = i.interpretar(arbol, tablaLocal);
                if (res instanceof Errores) return res;
                // En el futuro manejaremos Return aquí
                if (res instanceof Break) {
                    return new Errores("Semantico", "Break fuera de un ciclo no permitido", this.linea, this.columna);
                }
            }
        }

        return null;
    }
}
