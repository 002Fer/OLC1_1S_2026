import express from 'express';
import cors from 'cors';
import Arbol from './controller/analizador/simbolo/Arbol';
import TablaSimbolo from './controller/analizador/simbolo/tablaSimbolo';
import DeclaracionFuncion from './controller/analizador/instrucciones/DeclaracionFuncion';
import Declaracion from './controller/analizador/instrucciones/Declaracion';
import DeclaracionCorta from './controller/analizador/instrucciones/DeclaracionCorta';
import LlamadaFuncion from './controller/analizador/instrucciones/LlamadaFuncion';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/interpret', (req, res) => {
    const { code } = req.body;
    try {
        const parser = require('./controller/analizador/analizador.js');
        const ast = new Arbol(parser.parse(code));
        const tabla = new TablaSimbolo();

        ast.setTablaGlobal(tabla);
        ast.setConsola("");

        // Fase 1: Registro de funciones y variables globales
        for (let i of ast.getInstrucciones()) {
            if (i instanceof DeclaracionFuncion || i instanceof Declaracion || i instanceof DeclaracionCorta) {
                i.interpretar(ast, tabla);
            }
        }

        // Fase 2: Ejecución de la función main
        const mainFunc = ast.getFuncion("main");
        if (mainFunc) {
            const llamadaMain = new LlamadaFuncion("main", [], mainFunc.linea, mainFunc.columna);
            const resultado = llamadaMain.interpretar(ast, tabla);
            if (resultado instanceof Error) {
                 return res.status(400).json({ error: resultado.message });
            }
        } else {
             // Si no hay main, tal vez ejecutar todo secuencialmente o avisar
             // Vamos a permitir ejecución secuencial si no hay main para flexibilidad
             for (let i of ast.getInstrucciones()) {
                if (!(i instanceof DeclaracionFuncion || i instanceof Declaracion || i instanceof DeclaracionCorta)) {
                    i.interpretar(ast, tabla);
                }
             }
        }

        res.json({
            output: ast.getConsola(),
            errors: ast.getErrores(),
            tokens: parser.getTokens ? parser.getTokens() : []
        });

    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
