import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo,{tipoDato} from "../simbolo/Tipo";


export default class Relacionales extends Instruccion{

    private operador1:Instruccion
    private operador2:Instruccion
    private Operacion:Op_relacionales

    constructor(operacion:Op_relacionales,linea:number, columna:number,op1:Instruccion,op2:Instruccion){
        super(new Tipo(tipoDato.BOOLEAN), linea,columna)
        this.Operacion=operacion
        this.operador1=op1
        this.operador2=op2
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let opIzq, opDer=null

        opIzq=this.operador1.interpretar(arbol,tabla)
        if(opIzq instanceof Errores) return opIzq

        opDer=this.operador2.interpretar(arbol,tabla)

        switch(this.Operacion){
            case Op_relacionales.IGUALDAD:
                return this.igual_igual(opIzq,opDer)

            case Op_relacionales.MENOR:
                return this.menor(opIzq,opDer)

            case Op_relacionales.MAYOR_IGUAL:
                return this.mayor_igual(opIzq,opDer)

        }
    }

    igual_igual(op1:any,op2:any){
        let tipo1=this.operador1.tipoDato.getTipo()
        let tipo2=this.operador2.tipoDato.getTipo()

        switch(tipo1){
            case tipoDato.ENTERO:
                switch(tipo2){
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.BOOLEAN)
                        return parseInt(op1) == parseInt(op2)
                    
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.BOOLEAN)
                        return parseFloat(op1)== parseFloat(op2)

                    default:
                        return new Errores("semantico","No se puede hacer esta comparacion de igualdad",this.linea,this.columna)

                }
            case tipoDato.DECIMAL:
                switch(tipo2){
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.BOOLEAN)
                        return parseFloat(op1)== parseFloat(op2)
                    
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.BOOLEAN)
                        return parseFloat(op1)== parseFloat(op2)

                    default:
                        return new Errores("semantico","No se puede hacer esta comparacion de igualdad",this.linea,this.columna)
                }


            
        }
    }

    menor(op1:any,op2:any){
        let tipo1=this.operador1.tipoDato.getTipo()
        let tipo2=this.operador2.tipoDato.getTipo()

        switch(tipo1){
            case tipoDato.ENTERO:
                switch(tipo2){
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.BOOLEAN)
                        return parseInt(op1) < parseInt(op2)
                    
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.BOOLEAN)
                        return parseFloat(op1) < parseFloat(op2)

                    default:
                        return new Errores("semantico","No se puede hacer esta comparacion de menor",this.linea,this.columna)

                }
            case tipoDato.DECIMAL:
                switch(tipo2){
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.BOOLEAN)
                        return parseFloat(op1) < parseFloat(op2)
                    
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.BOOLEAN)
                        return parseFloat(op1) < parseFloat(op2)

                    default:
                        return new Errores("semantico","No se puede hacer esta comparacion de menor",this.linea,this.columna)
                }
 
            
        }
    }
 
    mayor_igual(op1:any,op2:any){
        let tipo1=this.operador1.tipoDato.getTipo()
        let tipo2=this.operador2.tipoDato.getTipo()

        switch(tipo1){
            case tipoDato.ENTERO:
                switch(tipo2){
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.BOOLEAN)
                        return parseInt(op1) >= parseInt(op2)
                    
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.BOOLEAN)
                        return parseFloat(op1) >= parseFloat(op2)

                    default:
                        return new Errores("semantico","No se puede hacer esta comparacion de mayor igual",this.linea,this.columna)

                }
            case tipoDato.DECIMAL:
                switch(tipo2){
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.BOOLEAN)
                        return parseFloat(op1) >= parseFloat(op2)
                    
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.BOOLEAN)
                        return parseFloat(op1) >= parseFloat(op2)

                    default:
                        return new Errores("semantico","No se puede hacer esta comparacion de mayor igual",this.linea,this.columna)
                }

   
        }
    }
}

export enum Op_relacionales{
    IGUALDAD,
    MENOR,
    MAYOR_IGUAL
}