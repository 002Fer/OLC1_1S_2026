import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class DeclaracionFuncion extends Instruccion {
    private nombre: string;
    private parametros: Array<any>;
    private instrucciones: Array<Instruccion>;

    constructor(nombre: string, parametros: Array<any>, instrucciones: Array<Instruccion>, linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.nombre = nombre;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getParametros(): Array<any> {
        return this.parametros;
    }

    public getInstrucciones(): Array<Instruccion> {
        return this.instrucciones;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        arbol.addFuncion(this);
        return null;
    }
}
