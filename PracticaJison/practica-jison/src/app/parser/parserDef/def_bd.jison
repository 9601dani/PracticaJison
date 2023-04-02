%lex
TRUE              "true"| "TRUE"
FALSE             "false"| "FALSE"
whitespace          [\n\t]+
ignore_line         \s+
space               \n
%%

(\#[^\r\n]*)            {/* ignore*/}
\s+                      {/*ignore*/}
"INT"                   return 'INT';
"DECIMAL"               return 'DECIMAL';
"STRING"                return 'STRING';
"BOOLEAN"               return 'BOOLEAN';
{TRUE}                  return 'TRUE';
{FALSE}                 return 'FALSE';
":"                     return 'DOS_PUNTOS';
";"                     return 'PUNTO_COMA';
","                     return `COMA`;
"&&"                    return 'AND';
"||"                    return 'OR';
"<="				            return 'MENOR_IGUAL_QUE';
">="				            return 'MAYOR_IGUAL_QUE';
"=="				            return 'DOBLE_IGUAL';
"!="				            return 'NO_IGUAL';
"<"					            return 'MENOR_QUE';
">"					            return 'MAYOR_QUE';
"="					            return 'IGUAL';
"!"					            return 'NOT';
"("                     return 'LPARENT';
")"                     return 'RPARENT';
"+"                     return 'MAS';
"-"                     return 'MENOS';
"*"                     return 'POR';
"/"                     return 'DIVIDE';
(\"[^\"]*\")				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
(\'[^\']*\')				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
([0-9]+("."[0-9]+)\b)  	return 'NUM_DECIMAL';
([0-9]+\b)				        return 'ENTERO';
([a-zA-Z][a-zA-Z0-9_]*)	%{
                          return 'LITERAL';
                        %}
<<EOF>>             %{
                        console.log('fin de archivo');
                        return 'EOF';
                    %}
.                   %{
                        console.log(`Error lexico ${yytext}`);
                        return 'INVALID';
                    %}
/lex
%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDE'
%start inic
%%
inic : instruc EOF
      | EOF;

instruc : instruc dataBase
			| dataBase;

dataBase: def_table PUNTO_COMA {console.log("Asignando table: "+ $1)}
        | def_values_of PUNTO_COMA;

def_table: LITERAL LPARENT def_values RPARENT { console.log(" property "+$1 +" value "+ $3) };

def_values: def_values COMA properties { $$ = " , "+$3 }
			| properties { $$ =$1 } ;

properties: LITERAL type { $$ = $1 +" TIPO-> " +$2 };

type: INT { $$ = "int"}
	| DECIMAL { $$ = "decimal"}
	| STRING { $$ = "string"}
	| BOOLEAN { $$ = "boolean"};

def_values_of: def_values_of COMA table_values
			| table_values ;

table_values: LITERAL IGUAL a { console.log("Asignando "+$1+ " el valor de " + $3); }
;

a
  : a OR b
    { $$ = $1 || $3}
  | b
    { $$ = $1; }
  ;

b
  : b AND c
    { $$ = $1 && $3}
  | c
    { $$ = $1; }
  ;

c : NOT c { $$= !$2}
   | d  { $$= $1}
   ;

d: d DOBLE_IGUAL e {$$ = $1 == $3 }
  |d NO_IGUAL e {$$ = $1 != $3 }
  |d MENOR_QUE e {$$ = $1 < $3 }
  |d MENOR_IGUAL_QUE e {$$ = $1 <= $3 }
  |d MAYOR_QUE e {$$ = $1 > $3 }
  |d MAYOR_IGUAL_QUE e {$$ = $1 >= $3 }
  | e
;

e: e MAS f {$$ = $1 + $3 }
  | e MENOS f {$$ = $1 - $3 }
  | f
;
f: f POR g {$$ = $1 * $3 }
  | f DIVIDE g {$$ = $1 / $3 }
  | g
;

g: MENOS h {$$ = -$2 }
  | MAS h {$$=$2}
  | h
;

h:  ENTERO {$$ = Number($1) }
    | NUM_DECIMAL {$$ =Number( $1) }
    | CADENA {$$ = $1 }
    | FALSE {$$ = false}
    | TRUE {$$ = true}
    | LPARENT a RPARENT {$$ = $2 }
;





