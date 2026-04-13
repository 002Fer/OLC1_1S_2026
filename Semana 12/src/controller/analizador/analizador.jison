%{

    const Tipo = require('./simbolo/Tipo')
    const Nativos= require('./expresiones/Nativos')
    const Aritmeticas= require('./expresiones/Aritmeticas')
    const Relacionales= require('./expresiones/Relacionales')


    const Declaracion= require('./instrucciones/Declaracion')
    const AccesoVar=require('./expresiones/AccesoVar')
    const AsignacionVar= require('./instrucciones/AsignacionVar')
    const Imprimir= require('./instrucciones/Imprimir')
%}

%lex
%%

//palabras reservadas
"var"       return 'VAR';
"int"       return 'INT';
"fmt.println" return 'IMPRIMIR';


"+"         return 'MAS';
"-"         return 'MENOS';
";"         return 'PUNTO_COMA';
"("         return 'PAR_ABRE';
")"         return 'PAR_CIERRA';
"<"         return 'MENOR';
">="        return 'MAYOR_IGUAL';
"=="        return 'IGUAL_IGUAL';
"="         return 'IGUAL';
"."         return 'PUNTO';



[0-9]+("."[0-9]+)?\b  return 'DECIMAL';
[0-9]+                  return 'ENTERO';
\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
[a-z][a-z0-9_]*         return 'ID'

[\ \t\n\r]+     {}; /* Ignorar espacios en blanco */
[\ \n]        {};
<<EOF>>     return 'EOF';

/lex

%left 'IGUAL_IGUAL' 'MENOR' 'MAYOR_IGUAL'
%left 'MAS' 'MENOS'

%right 'UMENOS'

%start INICIO

%%

INICIO : INSTRUCCIONES EOF {return $1;}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION    {$1.push($2); $$=$1;}
    |INSTRUCCION  {$$= [$1]}
;

INSTRUCCION : INS_IMPRIMIR {$$ = $1;}
            |ASIGNAR    {$$ = $1;}
            |DECLARACION    {$$ = $1;}
;

DECLARACION: VAR ID TIPO IGUAL EXPRESION {$$= new Declaracion.default($3,@1.first_line, @1.first_column,$2,$5);}
;

ASIGNAR: ID IGUAL EXPRESION {$$= new AsignacionVar.default($1, $3, @1.first_line, @1.first_column);}
;

INS_IMPRIMIR : IMPRIMIR PAR_ABRE EXPRESION PAR_CIERRA {$$= new Imprimir.default($3,@1.first_line, @1.first_column);}
;

EXPRESION : EXPRESION MAS EXPRESION  { $$= new Aritmeticas.default(Aritmeticas.OperadoresAritmeticos.SUMA, @1.first_line, @1.first_column, $1,$3 ); }
    |EXPRESION MENOS EXPRESION  { $$= new Aritmeticas.default(Aritmeticas.OperadoresAritmeticos.RESTA, @1.first_line, @1.first_column, $1,$3); }
    |MENOS EXPRESION %prec UMENOS { $$= new Aritmeticas.default(Aritmeticas.OperadoresAritmeticos.NEG, @1.first_line, @1.first_column, $2); }
    |ENTERO             {$$= new Nativos.default(new Tipo.default(Tipo.tipoDato.ENTERO),$1, @1.first_line, @1.first_column ); }
    |DECIMAL           {$$= new Nativos.default(new Tipo.default(Tipo.tipoDato.DECIMAL),$1, @1.first_line, @1.first_column ); }
    |EXPRESION IGUAL_IGUAL EXPRESION {$$= new Relacionales.default(Relacionales.Op_relacionales.IGUALDAD,@1.first_line, @1.first_column, $1,$3);}
    |EXPRESION MENOR EXPRESION {$$= new Relacionales.default(Relacionales.Op_relacionales.MENOR,@1.first_line, @1.first_column, $1,$3);}
    |EXPRESION MAYOR_IGUAL EXPRESION {$$= new Relacionales.default(Relacionales.Op_relacionales.MAYOR_IGUAL,@1.first_line, @1.first_column, $1,$3);}
    |NOT EXPRESION {$$= new Logicas.default(Logicas.operadoresLogicos.NOT,@1.first_line, @1.first_column, $2);}

    |ID         {$$= new AccesoVar.default($1,@1.first_line, @1.first_column);}

;

TIPO: INT {$$= new Tipo.default(Tipo.tipoDato.ENTERO);}

;
