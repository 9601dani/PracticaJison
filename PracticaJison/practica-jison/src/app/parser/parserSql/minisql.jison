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
  : declare_variables statements EOF
    { $$=$1; $$.push(...$2); return $$; }
  ;

statements
  : statements  state_op
    { $$ = $1; $$.push($2); }
  | state_op
    { $$ = []; $$.push($1)}
  ;


declare_variables : declare_variables  declare_prod  {$$ = $1; $$.push($2); }
                    | declare_prod { $$ = []; $$.push($1)}
;

declare_prod
           : DECLARE variablePro AS type IGUAL a PUNTO_COMA { $$ = new yy.Declare(this._$.first_line,this._$.first_column,$4,$2,$6)}
           | DECLARE variablePro  AS type PUNTO_COMA { $$ = new yy.Declare(this._$.first_line,this._$.first_column,$4,$2)}
;
variablePro: variablePro COMA VARIABLE {$$.push($3); $$=$1; }
            | VARIABLE {$$=[]; $$.push($1);}
;
type: INT { $$ = yy.VariableType.INT}
	| DECIMAL { $$ = yy.VariableType.DECIMAL}
	| TEXT { $$ = yy.VariableType.TEXT}
	| BOOLEAN { $$ = yy.VariableType.BOOLEAN};


state_op: print_stmt {$$=$1}
          | SET set_stmt PUNTO_COMA { $$= new yy.Settear(this._$.first_line,this._$.first_column,$2)}
          | if_stmt {$$=$1}
          | select_stmt PUNTO_COMA {$$=$1}
;
print_stmt
        : PRINT LPARENT expr RPARENT PUNTO_COMA
        {$$= new yy.Print(this._$.first_line,this._$.first_column,$3)}
;

expr : expr COMA a {$$=$1; $$.push($3);}
       | a {$$=[]; $$.push($1);}
;

set_stmt
       : set_stmt COMA setPro { $$=$1; $$.push($3);}
       | setPro  {$$=[]; $$.push($1);}
;

setPro: VARIABLE IGUAL a
    {$$= new yy.Assingment(this._$.first_line,this._$.first_column,$1,$3)}
;

if_stmt
  : IF a THEN statements else_statement END IF PUNTO_COMA
     {$$= new yy.IfState(this._$.first_line,this._$.first_column, $2, $4, $5)}
    |IF a THEN  else_statement END IF PUNTO_COMA
     {$$= new yy.IfState(this._$.first_line,this._$.first_column, $2,$4)}
;

else_statement
  : ELSEIF a THEN statements else_statement
     {$$= new yy.IfState(this._$.first_line,this._$.first_column, $2, $4, $5)}
  | ELSE statements
      {$$= new yy.ElseState(this._$.first_line,this._$.first_column, $2)}
  |
  ;

select_stmt
          : SELECT name_select FROM LITERAL select
;
select
     : where_pro
     | limit_pro
     | off_set_pro
     |
;
where_pro
        : WHERE a where
;
where
     : limit_pro
     | off_set_pro
     |
;

limit_pro
        : LIMIT a
;
limit
    : off_set_pro
    |
;

off_set_pro
          : OFFSET a
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
    {$$= new yy.OperacionBinaria(this._$.first_line,this._$.first_column,yy.OperationType.OR,$1, $3)}
  | b
    { $$ = $1; }
  ;

b
  : b AND c
    {$$= new yy.OperacionBinaria(this._$.first_line,this._$.first_column,yy.OperationType.AND,$1, $3)}
  | c
    { $$ = $1; }
  ;

c : NOT c {$$= new yy.OperacionBinaria(this._$.first_line,this._$.first_column,yy.OperationType.NOT,$1, $2)}
   | d  { $$= $1}
   ;

d: d NO_IGUAL e {$$= new yy.OperacionBinaria(this._$.first_line,this._$.first_column,yy.OperationType.NO_IGUAL,$1, $3)}
  |d MENOR_QUE e {$$= new yy.OperacionBinaria(this._$.first_line,this._$.first_column,yy.OperationType.MENOR_QUE,$1, $3)}
  |d MENOR_IGUAL_QUE e {$$= new yy.OperacionBinaria(this._$.first_line,this._$.first_column,yy.OperationType.MENOR_IGUAL_QUE,$1, $3)}
  |d MAYOR_QUE e {$$= new yy.OperacionBinaria(this._$.first_line,this._$.first_column,yy.OperationType.MAYOR_QUE,$1, $3)}
  |d MAYOR_IGUAL_QUE e {$$= new yy.OperacionBinaria(this._$.first_line,this._$.first_column,yy.OperationType.MAYOR_IGUAL_QUE,$1, $3)}
  |d IGUAL e {$$= new yy.OperacionBinaria(this._$.first_line,this._$.first_column,yy.OperationType.IGUAL,$1, $3)}}
  | e
;

e: e MAS f {$$= new yy.OperacionBinaria(this._$.first_line,this._$.first_column,yy.OperationType.MAS,$1, $3)}
  | e MENOS f {$$= new yy.OperacionBinaria(this._$.first_line,this._$.first_column,yy.OperationType.MENOS,$1, $3)}
  | f
;
f: f POR g {$$= new yy.OperacionBinaria(this._$.first_line,this._$.first_column,yy.OperationType.POR,$1, $3)}
  | f DIVIDE g {$$= new yy.OperacionBinaria(this._$.first_line,this._$.first_column,yy.OperationType.DIVIDE,$1, $3)}
  | g
;

g: MENOS h {$$ = -$2 }
  | MAS h {$$=$2}
  | h
;

h:  ENTERO {$$= new yy.Value(this._$.first_line,this._$.first_column,$1,yy.ValueType.ENTERO)}
    | NUM_DECIMAL {$$= new yy.Value(this._$.first_line,this._$.first_column,$1,yy.ValueType.NUM_DECIMAL)}
    | CADENA {$$= new yy.Value(this._$.first_line,this._$.first_column,$1,yy.ValueType.CADENA)}
    | FALSE {$$= new yy.Value(this._$.first_line,this._$.first_column,$1,yy.ValueType.FALSE)}
    | TRUE {$$= new yy.Value(this._$.first_line,this._$.first_column,$1,yy.ValueType.TRUE)}
    | VARIABLE {$$= new yy.Value(this._$.first_line,this._$.first_column,$1,yy.ValueType.VARIABLE)}
    | LITERAL {$$= new yy.Value(this._$.first_line,this._$.first_column,$1,yy.ValueType.LITERAL)}
    | LPARENT a RPARENT {$$ = $2 }
;

