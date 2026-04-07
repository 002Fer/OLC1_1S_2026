import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";



export default class Aritmeticas extends Instruccion{
        private operando1: Instruccion|undefined
        private operando2: Instruccion|undefined

        private operador: OperadoresAritmeticos
        private operadorUnico:Instruccion|undefined

        constructor(operador:OperadoresAritmeticos, linea:number, columna:number, operando1: Instruccion, operando2?:Instruccion){
            super(new Tipo(tipoDato.ENTERO), linea, columna)

            this.operador=operador
            if (!operando2)this.operadorUnico=operando1
            else{
                this.operando1=operando1
                this.operando2=operando2
            }
            

        }
        interpretar(arbol: Arbol, tabla: TablaSimbolo) {

            let opIzq, opDer, Unico=null

            if (this.operadorUnico !=null){
                Unico=this.operadorUnico.interpretar(arbol,tabla)

            }else{

            opIzq=this.operando1?.interpretar(arbol,tabla)
            if(opIzq instanceof Errores) return opIzq
            opDer=this.operando2?.interpretar(arbol,tabla)
            if(opDer instanceof Errores) return opIzq

            switch (this.operador){
                case OperadoresAritmeticos.SUMA:
                    return this.suma(opIzq,opDer)
                case OperadoresAritmeticos.RESTA:
                    return this.resta(opIzq,opDer)
                case OperadoresAritmeticos.NEG:
                    return this.negacion(Unico)
                
            }

        }
        }

        suma(op1:any, op2:any){
            let tipo1 = this.operando1?.tipoDato.getTipo()
            let tipo2 = this.operando2?.tipoDato.getTipo()

            switch (tipo1){
                case tipoDato.ENTERO:
                    switch(tipo2){
                        case tipoDato.ENTERO:
                            this.tipoDato.setTipo(tipoDato.ENTERO)
                            return parseInt(op1)+ parseInt(op2)

                        case tipoDato.DECIMAL:
                            this.tipoDato.setTipo(tipoDato.DECIMAL)
                            return parseFloat(op1)+ parseFloat(op2)

                        default:
                            return new Errores("Semantico","suma entre operadores no existe", this.linea, this.columna)

                    }
                case tipoDato.DECIMAL:
                    switch(tipo2){
                        case tipoDato.ENTERO:
                            this.tipoDato.setTipo(tipoDato.ENTERO)
                            return parseFloat(op1)+ parseFloat(op2)

                        case tipoDato.DECIMAL:
                            this.tipoDato.setTipo(tipoDato.DECIMAL)
                            return parseFloat(op1)+ parseFloat(op2)

                        default:
                            return new Errores("Semantico","suma entre operadores no existe", this.linea, this.columna)

                    }
            }


        
        }
        resta(op1:any, op2:any){
            let tipo1 = this.operando1?.tipoDato.getTipo()
            let tipo2 = this.operando2?.tipoDato.getTipo()

            switch (tipo1){
                case tipoDato.ENTERO:
                    switch(tipo2){
                        case tipoDato.ENTERO:
                            this.tipoDato.setTipo(tipoDato.ENTERO)
                            return parseInt(op1)- parseInt(op2)

                        case tipoDato.DECIMAL:
                            this.tipoDato.setTipo(tipoDato.DECIMAL)
                            return parseFloat(op1)- parseFloat(op2)

                        default:
                            return new Errores("Semantico","suma entre operadores no existe", this.linea, this.columna)

                    }
                case tipoDato.DECIMAL:
                    switch(tipo2){
                        case tipoDato.ENTERO:
                            this.tipoDato.setTipo(tipoDato.ENTERO)
                            return parseFloat(op1)- parseFloat(op2)

                        case tipoDato.DECIMAL:
                            this.tipoDato.setTipo(tipoDato.DECIMAL)
                            return parseFloat(op1)- parseFloat(op2)

                        default:
                            return new Errores("Semantico","suma entre operadores no existe", this.linea, this.columna)

                    }
            }


        
        }   
    negacion(op1: any) {
        let opU = this.operadorUnico?.tipoDato.getTipo()
        switch (opU) {
            case tipoDato.ENTERO:
                this.tipoDato = new Tipo(tipoDato.ENTERO)
                return parseInt(op1) * -1
            case tipoDato.DECIMAL:
                this.tipoDato = new Tipo(tipoDato.DECIMAL)
                return parseFloat(op1) * -1
            default:
                return new Errores("Semantico", "Negacion Unaria invalida", this.linea, this.columna)
        }
    }


}

export enum OperadoresAritmeticos{
    SUMA,
    RESTA,
    NEG
}