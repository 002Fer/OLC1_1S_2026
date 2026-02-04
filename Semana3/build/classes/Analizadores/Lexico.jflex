
%%

%class Lexer
%public
%unicode
%line
%column
%type void

%{

// aquí podría ir código Java si luego lo necesitas

%}

/* === DEFINICIONES === */
DIGITO      = [0-9]
LETRA       = [a-zA-Z]
ID          = {LETRA}({LETRA}|{DIGITO})*
NUMERO      = {DIGITO}+(\.{DIGITO}+)?

%%

/* === REGLAS === */


POR = '*'
SUMA= '+'

PAR1='('
PAR2=')'

IF='if'


{NUMERO}    { System.out.println("NUMERO -> " + yytext()); }

"+"         { System.out.println("SUMA -> +"); }
"-"         { System.out.println("RESTA -> -"); }
"*"         { System.out.println("MULTIPLICACION -> *"); }
"/"         { System.out.println("DIVISION -> /"); }

"("         { System.out.println("PARENTESIS ABRE"); }
")"         { System.out.println("PARENTESIS CIERRA"); }


[ \t\r\n]+  { /* ignorar espacios */ }

.           { System.out.println("ERROR LEXICO -> " + yytext()); }
