import Simbolo from "./Simbolo";


export default class TablaSimbolo{
    private tablaActual: Map<string,Simbolo>
    private nombreDato: string
    private tablaAnterior: TablaSimbolo | undefined

    constructor(anterior?: TablaSimbolo){
        this.tablaActual= new Map<string,Simbolo>()
        this.nombreDato=""
        this.tablaAnterior = anterior
    }
        public getTabla(): Map<string, Simbolo> {
        return this.tablaActual;
    }
        public setTabla(tabla: Map<string, Simbolo>): void {
        this.tablaActual = tabla;
    }
        public getNombreDato(): string {
        return this.nombreDato;
    }
    public setNombreDato(nombreDato: string): void {
        this.nombreDato = nombreDato;
    }

    public setVariable(simbolo:Simbolo){
        let busqueda:Simbolo= <Simbolo>this.getTabla().get(simbolo.getId())

        if(busqueda==null){
            this.tablaActual.set(simbolo.getId(), simbolo)
            return true
        }
        return false
    }

    public getVariable(id:string):Simbolo{
        for (let actual: TablaSimbolo | undefined = this; actual != undefined; actual = actual.getAnterior()) {
            let busqueda = <Simbolo>actual.getTabla().get(id)
            if (busqueda != null) return busqueda
        }
        return <any>null
    }

    public getAnterior(): TablaSimbolo | undefined {
        return this.tablaAnterior
    }
}