import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class IncrementoUnario extends Instruccion {
    private id: string;

    constructor(id: string, linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.id = id;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        // 1. Buscar la variable
        let variable = tabla.getVariable(this.id);
        if (variable == null) {
            return new Errores("Semantico", `La variable '${this.id}' no existe`, this.linea, this.columna);
        }

        // 2. Obtener el valor actual
        let valorActual = variable.getValor();
        let tipoVariable = variable.getTipo().getTipo();

        // 3. Validar tipo numérico y realizar el incremento
        let resultado;
        if (tipoVariable === tipoDato.ENTERO) {
            resultado = parseInt(valorActual) + 1;
        } else if (tipoVariable === tipoDato.DECIMAL) {
            resultado = parseFloat(valorActual) + 1.0;
        } else {
            return new Errores("Semantico", "El operador ++ solo es valido para tipos numericos", this.linea, this.columna);
        }

        // 4. Actualizar el valor
        variable.setValor(resultado);
        return null;
    }
}
