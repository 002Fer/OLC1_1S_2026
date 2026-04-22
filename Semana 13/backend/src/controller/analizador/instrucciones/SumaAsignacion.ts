import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class SumaAsignacion extends Instruccion {
    private id: string;
    private expresion: Instruccion;

    constructor(id: string, expresion: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.id = id;
        this.expresion = expresion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        // 1. Buscar la variable
        let variable = tabla.getVariable(this.id);
        if (variable == null) {
            return new Errores("Semantico", `La variable '${this.id}' no existe`, this.linea, this.columna);
        }

        // 2. Interpretar el valor a sumar
        let valorSumar = this.expresion.interpretar(arbol, tabla);
        if (valorSumar instanceof Errores) return valorSumar;

        // 3. Obtener el valor actual
        let valorActual = variable.getValor();
        let tipoVariable = variable.getTipo().getTipo();
        let tipoExpresion = this.expresion.tipoDato.getTipo();

        // 4. Realizar la suma validando tipos
        let resultado;
        if (tipoVariable === tipoDato.ENTERO) {
            if (tipoExpresion === tipoDato.ENTERO) {
                resultado = parseInt(valorActual) + parseInt(valorSumar);
            } else if (tipoExpresion === tipoDato.DECIMAL) {

                resultado = parseInt(valorActual) + parseFloat(valorSumar);
                resultado = Math.floor(resultado); // Forzar a entero
            } else {
                return new Errores("Semantico", "No se puede sumar este tipo a un ENTERO", this.linea, this.columna);
            }
        } else if (tipoVariable === tipoDato.DECIMAL) {
            if (tipoExpresion === tipoDato.ENTERO || tipoExpresion === tipoDato.DECIMAL) {
                resultado = parseFloat(valorActual) + parseFloat(valorSumar);
            } else {
                return new Errores("Semantico", "No se puede sumar este tipo a un DECIMAL", this.linea, this.columna);
            }
        } else {
            return new Errores("Semantico", "La operacion += solo es valida para tipos numericos", this.linea, this.columna);
        }

        // 5. Actualizar el valor
        variable.setValor(resultado);
        return null;
    }
}
