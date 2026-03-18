# PASOS PARA PODER COMPILAR 

### En la raiz del proyecto correr "npm run build" esto detectara cambios en el proyecto y les mostrara donde hay errores

### En otra terminal correr " npm run jison" esto para que se ejecute el codigo de jison

### Y por ultimo ejecutar " node build/index.js " esto corre el archivo principal y muestra el resultado en la terminal


### CAMBIOS QUE SE LE HICIERON DESPUES DE LA CLASE 

## 1. En el tsconfig.json se agrego lo siguiente "types": ["node"], para que el require en el index pueda ejecutarse correctamente
## 2. En el package.json se le agrego "jison": "jison src/controller/analizador/analizador.jison  && move analizador.js build/controller/analizador" esto hace que el codigo de TypeScript cree su correspondiente en javascript que es el que corre
## 3. Arreglo en el analizador.jison 
