import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import TablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class DeclaracionCorta extends Instruccion {
    private id: string;
    private valor: Instruccion;

    constructor(id: string, valor: Instruccion, linea: number, columna: number) {
        // Inicialmente el tipo es VOID, se inferirá en interpretar
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.id = id;
        this.valor = valor;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        // 1. Interpretar la expresión
        let resValor = this.valor.interpretar(arbol, tabla);
        if (resValor instanceof Errores) return resValor;

        // 2. Obtener el tipo de la expresión
        this.tipoDato = this.valor.tipoDato;

        // 3. Crear el símbolo y guardarlo en la tabla
        let nuevoSimbolo = new Simbolo(this.tipoDato, this.id, resValor);
        if (!tabla.setVariable(nuevoSimbolo)) {
            return new Errores("Semantico", `La variable '${this.id}' ya ha sido declarada anteriormente`, this.linea, this.columna);
        }

        return null;
    }
}
