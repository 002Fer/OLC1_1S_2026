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
    setVariable(simbolo) {
        let busqueda = this.getTabla().get(simbolo.getId());
        if (busqueda == null) {
            this.tablaActual.set(simbolo.getId(), simbolo);
            return true;
        }
        return false;
    }
    getVariable(id) {
        return this.getTabla().get(id);
    }
}
exports.default = TablaSimbolo;
