import tablaSimbolo from "./tablaSimbolo";
import {Instruccion} from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";

export default class Arbol {
    private instrucciones: Array<Instruccion>;
    private consola:string 
    private tablaGlobal: tablaSimbolo;
    private errores: Array<Errores>;
    private funciones: Array<any>;
    private tokens: Array<any>;

        constructor(instrucciones: Array<Instruccion>) {
        this.instrucciones = instrucciones;
        this.consola = "";
        this.tablaGlobal = new tablaSimbolo();
        this.errores = new Array<Errores>();
        this.funciones = new Array<any>();
        this.tokens = new Array<any>();
    }
    public getInstrucciones(): Array<Instruccion> {
        return this.instrucciones;
    }
    public getConsola(): string {
        return this.consola;
    }   
    public getTablaGlobal(): tablaSimbolo {
        return this.tablaGlobal;
    }
    public getErrores(): Array<Errores> {
        return this.errores;
    }
    public setInstrucciones(instrucciones: Array<Instruccion>): void {
        this.instrucciones = instrucciones;
    }
    public setConsola(consola: string): void {
        this.consola = consola;
    }
    public setTablaGlobal(tablaGlobal: tablaSimbolo): void {
        this.tablaGlobal = tablaGlobal;
    }
    public setErrores(errores: Array<Errores>): void {
        this.errores = errores;
    }
    public Print(entrada: any) {
        this.consola = `${this.consola}${entrada}\n`
    }

    public addFuncion(funcion: any) {
        this.funciones.push(funcion);
    }

    public getFunciones(): Array<any> {
        return this.funciones;
    }

    public getFuncion(id: string): any {
        return this.funciones.find(f => f.getNombre().toLowerCase() === id.toLowerCase());
    }

    public addToken(token: any) {
        this.tokens.push(token);
    }

    public getTokens(): Array<any> {
        return this.tokens;
    }
    
}