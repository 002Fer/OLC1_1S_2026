# Intérprete Go-Style (TypeScript + Jison)

Este proyecto es un intérprete experimental basado en el patrón **Interpreter**, diseñado para procesar un subconjunto de instrucciones con sintaxis similar a Go. Utiliza **Jison** para el análisis léxico y sintáctico.

## 🚀 Funcionalidades Implementadas

A continuación se detallan las capacidades agregadas recientemente al intérprete:

### 1. Control de Flujo: Sentencia If-Else
Permite la ejecución condicional de bloques de código basados en expresiones booleanas.
```go
if condicion == 10 {
    fmt.println("Es 10")
} else {
    fmt.println("No es 10")
}
```

### 2. Ciclos: For (Estilo Go)
Soporte para ciclos `for` en dos variantes:
- **Como While**: Funciona bajo una sola condición.
- **Completo (3 partes)**: Con inicialización, condición y actualización.
```go
// Variante While
for i < 5 { ... }

// Variante Completa
for i = 1; i < 6; i += 1 {
    fmt.println(i)
}
```

### 3. Declaración y Asignación
- **Declaración Estándar**: `var x int = 5`
- **Declaración Corta (`:=`)**: Inferencia automática de tipos. `num := 100`
- **Suma-Asignación (`+=`)**: Incremento simplificado de variables. `num += 10`

### 4. Operaciones y Tipos
- **Concatenación de Cadenas**: Ahora el operador `+` permite unir cadenas con cualquier otro tipo de dato.
```go
fmt.println("El resultado es: " + resultado)
```
- **Aritmética Correcta**: Distinción precisa entre tipos `ENTERO` y `DECIMAL` en el análisis léxico.

---

## 🛠️ Estructura del Proyecto

- `src/controller/analizador/analizador.jison`: Gramática y definiciones léxicas.
- `src/controller/analizador/instrucciones/`: Clases que representan las instrucciones (AST).
  - `CondicionalIf.ts`
  - `CicloFor.ts`
  - `DeclaracionCorta.ts`
  - `SumaAsignacion.ts`
- `src/controller/analizador/expresiones/`: Lógica de operaciones aritméticas y relacionales.

## 💻 Ejecución del Proyecto

1. **Generar el analizador**:
   ```bash
   npm run jison
   ```

2. **Compilar y ejecutar**:
   ```bash
   npx tsc; node build/index.js
   ```

---

## 📝 Historial de Cambios Recientes
- [x] Agregado soporte para bloques `if-else`.
- [x] Implementado operador de incremento `+=`.
- [x] Implementada declaración corta `:=` con inferencia de tipos.
- [x] Implementado ciclo `for` Go-style (Variantes While y Completo).
- [x] Agregado soporte para el separador `;` en estructuras de control.
- [x] Corregido bug en el Lexer que detectaba todos los números como decimales.
- [x] Habilitada la concatenación de strings en expresiones de suma.
- [x] Corregidos errores de validación de tipos en declaraciones y asignaciones.
