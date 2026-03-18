"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TablaSimbolo {
    constructor() {
        this.tablaActual = new Map();
        this.nombreDato = "";
    }
    getTabla() {
        return this.tablaActual;
    }
    setTabla(tabla) {
        this.tablaActual = tabla;
    }
    getNombreDato() {
        return this.nombreDato;
    }
    setNombreDato(nombreDato) {
        this.nombreDato = nombreDato;
    }
}
exports.default = TablaSimbolo;
