%{
var myObject;
%}
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
      {return $1;}
      | EOF
;

instruc : instruc data_base {$$ = $1; $$.push($2); }
			| data_base { $$ = []; $$.push($1);}
;

data_base
  : def_table  { myObject= $$ = new yy.DBTable($1); }
  | def_table_of PUNTO_COMA %{
            if(myObject.statem===undefined){
              myObject.statem= [];
              myObject.statem.push($1);
            }else{
              myObject.statem.push($1);
            }
    %}
  ;

def_table
        : name_table LPARENT def_values RPARENT PUNTO_COMA {$$=new yy.DataB($1,$3)}
;

name_table
        : LITERAL {$$=$1}
;

def_values: def_values COMA properties {$$ = $1; $$.push($3);}
			| properties { $$ = []; $$.push($1); }
;

properties: LITERAL type { $$ = new yy.Propiedad($1, $2)};

type: INT { $$ = yy.TypePropiedad.INT}
	| DECIMAL { $$ =  yy.TypePropiedad.DECIMAL}
	| STRING { $$ =  yy.TypePropiedad.STRING}
	| BOOLEAN { $$ =  yy.TypePropiedad.BOOLEAN};

def_table_of
           : def_table_of  def_values_of PUNTO_COMA  {$$ = $1; $$.push($2);}
           | def_values_of  {$$ = []; $$.push($1); }
;

def_values_of: def_values_of COMA table_values {$$ = $1; $$.push($3);}
			| table_values { $$ = []; $$.push($1); }
;

table_values: LITERAL IGUAL a { $$= new yy.Atributo($3,$1) }
;

a
  : a OR b
    { $$ = new yy.TypeProStmt($1 || $3, yy.TypePropiedad.BOOLEAN)}
  | b
    { $$ = $1; }
  ;

b
  : b AND c
     { $$ = new yy.TypeProStmt($1 && $3, yy.TypePropiedad.BOOLEAN)}
  | c
    { $$ = $1; }
  ;

c : NOT c  { $$ = new yy.TypeProStmt(!$2, yy.TypePropiedad.BOOLEAN)}
   | d  { $$= $1}
   ;

d: d DOBLE_IGUAL e  { $$ = new yy.TypeProStmt($1 == $3, yy.TypePropiedad.BOOLEAN)}
  |d NO_IGUAL e  { $$ = new yy.TypeProStmt($1 != $3, yy.TypePropiedad.BOOLEAN)}
  |d MENOR_QUE e  { $$ = new yy.TypeProStmt($1 < $3, yy.TypePropiedad.BOOLEAN)}
  |d MENOR_IGUAL_QUE e  { $$ = new yy.TypeProStmt($1 <= $3, yy.TypePropiedad.BOOLEAN)}
  |d MAYOR_QUE e  { $$ = new yy.TypeProStmt($1 > $3, yy.TypePropiedad.BOOLEAN)}
  |d MAYOR_IGUAL_QUE e  { $$ = new yy.TypeProStmt($1 >= $3, yy.TypePropiedad.BOOLEAN)}
  | e {$$=$1}
;

e: e MAS f
%{
    if(($1+$3)% 1 == 0){
         $$ = new yy.TypeProStmt($1+$3, yy.TypePropiedad.INT);
    }else{
         $$ = new yy.TypeProStmt($1 + $3, yy.TypePropiedad.DECIMAL);
    }
%}
  | e MENOS f
%{
      if(($1-$3)% 1 == 0){
         $$ = new yy.TypeProStmt($1 - $3, yy.TypePropiedad.INT);
      }else{
         $$ = new yy.TypeProStmt($1 - $3, yy.TypePropiedad.DECIMAL);
      }
%}
  | f {$$=$1}
;

f: f POR g
%{
      if(($1*$3)% 1 == 0){
         $$ = new yy.TypeProStmt($1 * $3 ,yy.TypePropiedad.INT);
      }else{
         $$ = new yy.TypeProStmt($1 * $3, yy.TypePropiedad.DECIMAL);
      }
%}
  | f DIVIDE g
%{
      if(($1/$3)% 1 == 0){
         $$ = new yy.TypeProStmt($1 / $3, yy.TypePropiedad.INT);
      }else{
         $$ = new yy.TypeProStmt($1 / $3, yy.TypePropiedad.DECIMAL);
      }
%}
  | g {$$=$1}
;

g: MENOS h {$$ = -$2}
  | MAS h {$$=$2}
  | h {$$=$1}
;

h:  ENTERO {$$ = Number($1) }
    | NUM_DECIMAL {$$ =Number( $1) }
    | CADENA {$$ = new yy.TypeProStmt($1, yy.TypePropiedad.STRING);}
    | FALSE {$$ = false}
    | TRUE {$$ = true}
    | LPARENT a RPARENT {$$ = $2 }
;





