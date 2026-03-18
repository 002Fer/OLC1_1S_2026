package Analizadores;
//importaciones
import java_cup.runtime.Symbol;
import java.util.LinkedList;

%%
//definicion de variables
%{
    //Aca van las listas de errores y de los tokens
%}
// Definiciones iniciales
%init{
    yyline = 1;
    yycolumn = 1;
%init}

//declaraciones de caracteristicas de jflex
%cup
%class scanner
%public
%line
%char
%column
%full
//%debug
%ignorecase



// definir los simbolos del sistema
MAS = "+"
MENOS = "-"
MULT = "*"
DIV = "/"
FINCADENA=";"
DOSPUNTOS=":"
COMA=","

PAR1="("
PAR2=")"
LLAVE1="{"
LLAVE2="}"

//OPERADORES RELACIONALES
EQUALS="=="
DIFERENTE="!="
MENOR_QUE="<"
MENOR_IGUAL="<="
MAYOR_QUE=">"
MAYOR_IGUAL=">="

//LOGICOS
OR="||"
AND="&&"
NOT="!"

BLANCOS = [\ \r\t\n\f]+
ENTERO = [0-9]+
DECIMAL = [0-9]+"."[0-9]+
ID=[a-zA-Z][a-zA-Z0-9_]*
CADENA = [\"]([^\"])*[\"]

CHAR = \'(\\.|[^\\'])\'

COMENTARIO_SIMPLE = "//"[^\n]*
COMENTARIO_MULTILINEA = "/*"([^*]|\*+[^*/])*"*"+"/"

//PALABRAS RESERVADAS
IMPRIMIR="imprimir"
DATABASE="databaseManager"
STORE="store"
AT="at"
USE="use"

ADD="add"
READ="read"
TABLE="table"

INT="int"
STRING="string"

%%

<YYINITIAL> {COMENTARIO_SIMPLE} {} // Ignorar comentarios de una línea
<YYINITIAL> {COMENTARIO_MULTILINEA} {} // Ignorar comentarios multilínea

<YYINITIAL> {IMPRIMIR} { return new Symbol(sym.IMPRIMIR, yycolumn, yyline, yytext()); }

<YYINITIAL> {DATABASE} { return new Symbol(sym.DATABASE, yycolumn, yyline, yytext()); }

<YYINITIAL> {STORE} { return new Symbol(sym.STORE, yycolumn, yyline, yytext()); }

<YYINITIAL> {AT} { return new Symbol(sym.AT, yycolumn, yyline, yytext()); }

<YYINITIAL> {USE} { return new Symbol(sym.USE, yycolumn, yyline, yytext()); }
<YYINITIAL> {TABLE} { return new Symbol(sym.TABLE, yycolumn, yyline, yytext()); }
<YYINITIAL> {ADD} { return new Symbol(sym.ADD, yycolumn, yyline, yytext()); }
<YYINITIAL> {READ} { return new Symbol(sym.READ, yycolumn, yyline, yytext()); }

<YYINITIAL> {INT} { return new Symbol(sym.INT, yycolumn, yyline, yytext()); }
<YYINITIAL> {STRING} { return new Symbol(sym.STRING, yycolumn, yyline, yytext()); }

<YYINITIAL> {ID} { return new Symbol(sym.ID, yycolumn, yyline, yytext()); }

<YYINITIAL> {DECIMAL} { return new Symbol(sym.DECIMAL, yycolumn, yyline, yytext()); }

<YYINITIAL> {ENTERO} { return new Symbol(sym.ENTERO, yycolumn, yyline, yytext()); }

<YYINITIAL> {CADENA} { 
    String cadena = yytext();
    cadena = cadena.substring(1, cadena.length() - 1);
    return new Symbol(sym.CADENA, yycolumn, yyline, cadena); 
}

<YYINITIAL> {CHAR} { return new Symbol(sym.CHAR, yycolumn, yyline, yytext()); }

<YYINITIAL> {FINCADENA} { return new Symbol(sym.FINCADENA, yycolumn, yyline, yytext()); }

//operadores aritmeticos
<YYINITIAL> {MAS} { return new Symbol(sym.MAS, yycolumn, yyline, yytext()); }

<YYINITIAL> {MENOS} { return new Symbol(sym.MENOS, yycolumn, yyline, yytext()); }

<YYINITIAL> {MULT} { return new Symbol(sym.MULT, yycolumn, yyline, yytext()); }

<YYINITIAL> {DIV} { return new Symbol(sym.DIV, yycolumn, yyline, yytext()); }

<YYINITIAL> {PAR1} { return new Symbol(sym.PAR1, yycolumn, yyline, yytext()); }

<YYINITIAL> {PAR2} { return new Symbol(sym.PAR2, yycolumn, yyline, yytext()); }

<YYINITIAL> {LLAVE1} { return new Symbol(sym.LLAVE1, yycolumn, yyline, yytext()); }

<YYINITIAL> {LLAVE2} { return new Symbol(sym.LLAVE2, yycolumn, yyline, yytext()); }

<YYINITIAL> {COMA} { return new Symbol(sym.COMA, yycolumn, yyline, yytext()); }
<YYINITIAL> {DOSPUNTOS} { return new Symbol(sym.DOSPUNTOS, yycolumn, yyline, yytext()); }

<YYINITIAL> {BLANCOS} {} // Ignorar espacios en blanco

<YYINITIAL> . { 
    System.out.print("Símbolo no reconocido: " + yytext()); 
}
