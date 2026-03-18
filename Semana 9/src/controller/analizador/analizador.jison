%{


    const Tipo = require('./simbolo/Tipo')
    const Nativo= require('./expresiones/Nativo')
    const Aritmeticas= require('./expresiones/Aritmeticas')
%}

%lex
%%

"+"         return 'MAS';
"-"         return 'MENOS';
";"         return 'PUNTO_COMA';
"("         return 'PAR_ABRE';
")"         return 'PAR_CIERRA';




[0-9]+("."[0-9]+)?\b  return 'DECIMAL';/
[0-9]+                  return 'ENTERO';




<<EOF>>     return 'EOF';

/lex


%lef 'MAS' 'MENOS'


%start INICIO

%%

INICIO : EXPRESION EOF {return $1;}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION    {$1.push($2); $$=$1;}
    |INSTRUCCION  {$$= [$1]}
;

INSTRUCCION : EXPRESION PUNTOCOMA {$$=$1}
;

EXPRESION:EXPRESION MAS EXPRESION  { $$= new Aritmeticas.default(Aritmeticas.Operador.SUMA,$1,$3,  @1.first_line, @1.first_column ); }
    |ENTERO             {$$= new Nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO),$1, @1.first_line, @1.first_column ); }
    |DECIMAL           {$$= new Nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL),$1, @1.first_line, @1.first_column ); }
;

//5+5+2+6