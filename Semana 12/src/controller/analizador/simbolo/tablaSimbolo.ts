import Simbolo from "./Simbolo";


export default class TablaSimbolo{
    private tablaActual: Map<string,Simbolo>
    private nombreDato: string

    constructor(){
        this.tablaActual= new Map<string,Simbolo>()
        this.nombreDato=""
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
        return <Simbolo>this.getTabla().get(id)

    }
}