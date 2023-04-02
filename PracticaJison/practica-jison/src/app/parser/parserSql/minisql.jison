%lex
%%
\s+                      {/*ignore*/}
("--".*)              {/* ignore*/}
"INT"               return 'INT';
"DECIMAL"           return 'DECIMAL';
"TEXT"              return 'TEXT';
"BOOLEAN"           return 'BOOLEAN';
"TRUE"              return 'TRUE';
"FALSE"             return 'FALSE';
"DECLARE"           return 'DECLARE';
"AS"                return 'AS';
"SET"               return 'SET';
"AND"               return 'AND';
"OR"                return 'OR';
"INPUT"             return 'INPUT';
"PRINT"             return 'PRINT';
"IF"                return 'IF';
"ELSEIF"            return 'ELSEIF';
"ELSE"              return 'ELSE';
"END"               return 'END';
"THEN"              return 'THEN';
"NOT"               return 'NOT';
"SELECT"            return 'SELECT';
"FROM"              return 'FROM';
"WHERE"             return 'WHERE';
"LIMIT"             return 'LIMIT';
"OFFSET"            return 'OFFSET';
"("                 return 'LPARENT';
")"                 return 'RPARENT';
"+"                 return 'MAS';
"-"                 return 'MENOS';
"*"                 return 'POR';
"/"                 return 'DIVIDE';
";"                 return 'PUNTO_COMA';
","                 return `COMA`;
"<>"                return 'NO_IGUAL'
"<="				        return 'MENOR_IGUAL_QUE';
">="				        return 'MAYOR_IGUAL_QUE';
"<"					        return 'MENOR_QUE';
">"					        return 'MAYOR_QUE';
"="					        return 'IGUAL';
("@"[a-zA-Z][a-zA-Z0-9_]*) return 'VARIABLE';
([0-9]+("."[0-9]+)\b)  	return 'NUM_DECIMAL';
([0-9]+\b)				        return 'ENTERO';
(\"[^\"]*\")				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
(\'[^\']*\')				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
([a-zA-Z][a-zA-Z0-9_]*)	%{
                          return 'LITERAL';
                        %}
<<EOF>>             %{
                        console.log('fin de archivo');
                        return "EOF";
                    %}
.                   %{
                        console.log(`Error lexico ${yytext}`);
                        return "INVALID";
                    %}
/lex
%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDE'
%start inic
%%
inic
  : statements EOF
    { return $1; }
  ;

statements
  : statements  statement
    { $$ = $1; $$.push($2); }
  |
    { $$ = []; }
  ;

statement
  :  declare_variables state_op
  | state_op
;
declare_variables : declare_variables  declare_prod
                    | declare_prod
;

declare_prod
           : DECLARE VARIABLE AS type IGUAL a PUNTO_COMA
           | DECLARE VARIABLE AS type PUNTO_COMA
           | DECLARE variablePro PUNTO_COMA
;

type: INT { $$ = "int"}
	| DECIMAL { $$ = "decimal"}
	| TEXT { $$ = "text"}
	| BOOLEAN { $$ = "boolean"};

variablePro: variablePro COMA VARIABLE  AS type
            | VARIABLE
;

state_op: print_stmt
          | SET set_stmt PUNTO_COMA
          | if_stmt
          | select_stmt
;
print_stmt
        : PRINT LPARENT expr RPARENT PUNTO_COMA
;

expr : expr COMA a
       | a
;

set_stmt
       : set_stmt COMA setPro
       | setPro
;

setPro: VARIABLE IGUAL a
;

if_stmt
  : IF a THEN prod_stmt else_statement END IF PUNTO_COMA
;
prod_stmt
        : prod_stmt statement
        | statement
;

else_statement
  : ELSEIF a THEN prod_stmt else_statement
  | ELSE prod_stmt
  |
  ;

select_stmt
          : SELECT name_select FROM LITERAL PUNTO_COMA
;

name_select: POR
          | names_select
;

names_select: names_select COMA LITERAL
            |LITERAL
;

a
  : INPUT LPARENT CADENA RPARENT
  |a OR b
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

d: d NO_IGUAL e {$$ = $1 != $3 }
  |d MENOR_QUE e {$$ = $1 < $3 }
  |d MENOR_IGUAL_QUE e {$$ = $1 <= $3 }
  |d MAYOR_QUE e {$$ = $1 > $3 }
  |d MAYOR_IGUAL_QUE e {$$ = $1 >= $3 }
  |d IGUAL e {$$ = $1 == $3 }
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
    | VARIABLE {$$= $1}
    | LPARENT a RPARENT {$$ = $2 }
;

