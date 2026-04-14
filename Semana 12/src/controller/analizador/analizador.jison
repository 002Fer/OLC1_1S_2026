%{

    const Tipo = require('./simbolo/Tipo')
    const Nativos= require('./expresiones/Nativos')
    const Aritmeticas= require('./expresiones/Aritmeticas')
    const Relacionales= require('./expresiones/Relacionales')


    const Declaracion= require('./instrucciones/Declaracion')
    const AccesoVar=require('./expresiones/AccesoVar')
    const AsignacionVar= require('./instrucciones/AsignacionVar')
    const Imprimir= require('./instrucciones/Imprimir')
    const CondicionalIf = require('./instrucciones/CondicionalIf');
    const SumaAsignacion = require('./instrucciones/SumaAsignacion');
    const DeclaracionCorta = require('./instrucciones/DeclaracionCorta');
    const CicloFor = require('./instrucciones/CicloFor');
    const CicloForCompleto = require('./instrucciones/CicloForCompleto');
    const Break = require('./instrucciones/Break');
%}

%lex
%%

//palabras reservadas
"var"       return 'VAR';
"int"       return 'INT';
"fmt.println" return 'IMPRIMIR';
"if"        return 'IF';
"else"      return 'ELSE';
"true"      return 'RTRUE';
"false"     return 'RFALSE';
"for"       return 'FOR';
"break"     return 'RBREAK';


"+="        return 'MAS_IGUAL';
"+"         return 'MAS';
"-"         return 'MENOS';
";"         return 'PUNTO_COMA';
"("         return 'PAR_ABRE';
")"         return 'PAR_CIERRA';
"{"         return 'LLAVE_ABRE';
"}"         return 'LLAVE_CIERRA';
"<"         return 'MENOR';
">="        return 'MAYOR_IGUAL';
"=="        return 'IGUAL_IGUAL';
":="        return 'DOS_PUNTOS_IGUAL';
"="         return 'IGUAL';



[0-9]+"."[0-9]+\b  return 'DECIMAL';
[0-9]+\b             return 'ENTERO';
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
            |INS_IF {$$ = $1;}
            |SUMA_ASIG {$$ = $1;}
            |DEC_CORTA {$$ = $1;}
            |INS_FOR {$$ = $1;}
            |INS_BREAK {$$ = $1;}
;

DECLARACION: VAR ID TIPO IGUAL EXPRESION {$$= new Declaracion.default($3,@1.first_line, @1.first_column,$2,$5);}
;

DEC_CORTA: ID DOS_PUNTOS_IGUAL EXPRESION {$$= new DeclaracionCorta.default($1, $3, @1.first_line, @1.first_column);}
;

ASIGNAR: ID IGUAL EXPRESION {$$= new AsignacionVar.default($1, $3, @1.first_line, @1.first_column);}
;

SUMA_ASIG: ID MAS_IGUAL EXPRESION {$$= new SumaAsignacion.default($1, $3, @1.first_line, @1.first_column);}
;

INS_IMPRIMIR : IMPRIMIR PAR_ABRE EXPRESION PAR_CIERRA {$$= new Imprimir.default($3,@1.first_line, @1.first_column);}
;

INS_IF : IF EXPRESION LLAVE_ABRE INSTRUCCIONES LLAVE_CIERRA { $$ = new CondicionalIf.default($2, $4, undefined, @1.first_line, @1.first_column); }
       | IF EXPRESION LLAVE_ABRE INSTRUCCIONES LLAVE_CIERRA ELSE LLAVE_ABRE INSTRUCCIONES LLAVE_CIERRA { $$ = new CondicionalIf.default($2, $4, $8, @1.first_line, @1.first_column); }
;

INS_FOR : FOR EXPRESION LLAVE_ABRE INSTRUCCIONES LLAVE_CIERRA { $$ = new CicloFor.default($2, $4, @1.first_line, @1.first_column); }
        | FOR INSTRUCCION PUNTO_COMA EXPRESION PUNTO_COMA INSTRUCCION LLAVE_ABRE INSTRUCCIONES LLAVE_CIERRA { $$ = new CicloForCompleto.default($2, $4, $6, $8, @1.first_line, @1.first_column); }
;

INS_BREAK : RBREAK { $$ = new Break.default(@1.first_line, @1.first_column); }
;

EXPRESION : EXPRESION MAS EXPRESION  { $$= new Aritmeticas.default(Aritmeticas.OperadoresAritmeticos.SUMA, @1.first_line, @1.first_column, $1,$3 ); }
    |EXPRESION MENOS EXPRESION  { $$= new Aritmeticas.default(Aritmeticas.OperadoresAritmeticos.RESTA, @1.first_line, @1.first_column, $1,$3); }
    |MENOS EXPRESION %prec UMENOS { $$= new Aritmeticas.default(Aritmeticas.OperadoresAritmeticos.NEG, @1.first_line, @1.first_column, $2); }
    |ENTERO             {$$= new Nativos.default(new Tipo.default(Tipo.tipoDato.ENTERO),$1, @1.first_line, @1.first_column ); }
    |DECIMAL           {$$= new Nativos.default(new Tipo.default(Tipo.tipoDato.DECIMAL),$1, @1.first_line, @1.first_column ); }
    |CADENA            {$$= new Nativos.default(new Tipo.default(Tipo.tipoDato.CADENA), $1, @1.first_line, @1.first_column ); }
    |RTRUE             {$$= new Nativos.default(new Tipo.default(Tipo.tipoDato.BOOLEAN), true, @1.first_line, @1.first_column ); }
    |RFALSE            {$$= new Nativos.default(new Tipo.default(Tipo.tipoDato.BOOLEAN), false, @1.first_line, @1.first_column ); }
    |EXPRESION IGUAL_IGUAL EXPRESION {$$= new Relacionales.default(Relacionales.Op_relacionales.IGUALDAD,@1.first_line, @1.first_column, $1,$3);}
    |EXPRESION MENOR EXPRESION {$$= new Relacionales.default(Relacionales.Op_relacionales.MENOR,@1.first_line, @1.first_column, $1,$3);}
    |EXPRESION MAYOR_IGUAL EXPRESION {$$= new Relacionales.default(Relacionales.Op_relacionales.MAYOR_IGUAL,@1.first_line, @1.first_column, $1,$3);}
    |NOT EXPRESION {$$= new Logicas.default(Logicas.operadoresLogicos.NOT,@1.first_line, @1.first_column, $2);}

    |ID         {$$= new AccesoVar.default($1,@1.first_line, @1.first_column);}

;

TIPO: INT {$$= new Tipo.default(Tipo.tipoDato.ENTERO);}
;
