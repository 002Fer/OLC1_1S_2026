%{

    const Tipo = require('./simbolo/Tipo')
    const Nativos= require('./expresiones/Nativos')
    const Aritmeticas= require('./expresiones/Aritmeticas')
%}

%lex
%%

"+"         return 'MAS';
"-"         return 'MENOS';
";"         return 'PUNTO_COMA';
"("         return 'PAR_ABRE';
")"         return 'PAR_CIERRA';



[0-9]+("."[0-9]+)?\b  return 'DECIMAL';
[0-9]+                  return 'ENTERO';



<<EOF>>     return 'EOF';

/lex

%left 'MAS' 'MENOS'


%start INICIO

%%

INICIO : INSTRUCCIONES EOF {return $1;}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION    {$1.push($2); $$=$1;}
    |INSTRUCCION  {$$= [$1]}
;

INSTRUCCION : EXPRESION PUNTO_COMA {$$=$1}
;

EXPRESION : EXPRESION MAS EXPRESION  { $$= new Aritmeticas.default(Aritmeticas.OperadoresAritmeticos.SUMA,$1,$3,  @1.first_line, @1.first_column ); }
    |EXPRESION MENOS EXPRESION { $$= new Aritmeticas.default(Aritmeticas.OperadoresAritmeticos.RESTA,$1,$3,  @1.first_line, @1.first_column ); }
    |ENTERO             {$$= new Nativos.default(new Tipo.default(Tipo.tipoDato.ENTERO),$1, @1.first_line, @1.first_column ); }
    |DECIMAL           {$$= new Nativos.default(new Tipo.default(Tipo.tipoDato.DECIMAL),$1, @1.first_line, @1.first_column ); }
;
