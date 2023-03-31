%lex
TRUE              "true"| "TRUE"
FALSE             "false"| "FALSE"
whitespace          [\n\t]+
ignore_line         \s+
space               \n
%%

(\#[^\r\n]*)            {}
\s+                      {}
"INT"                   return 'INT';
"DECIMAL"               return 'DECIMAL';
"STRING"                return 'STRING';
"BOOLEAN"               return 'BOOLEAN';
{TRUE}                return 'TRUE';
{FALSE}               return 'FALSE';
":"                 return 'DOS_PUNTOS';
";"                 return 'PUNTO_COMA';
","                 return `COMA`;
"&&"                return 'AND';
"||"                return 'OR';
"<="				        return 'MENOR_IGUAL_QUE';
">="				        return 'MAYOR_IGUAL_QUE';
"=="				        return 'DOBLE_IGUAL';
"!="				        return 'NO_IGUAL';
"<"					        return 'MENOR_QUE';
">"					        return 'MAYOR_QUE';
"="					        return 'IGUAL';
"!"					        return 'NOT';
"("                 return 'LPARENT';
")"                 return 'RPARENT';
"+"                     return 'MAS';
"-"                     return 'MENOS';
"*"                     return 'POR';
"/"                     return 'DIVIDE';
(\"[^\"]*\")				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
(\'[^\']*\')				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
([0-9]+("."[0-9]+)\b)  	return 'NUM_DECIMAL';
([0-9]+\b)				        return 'ENTERO';
([a-zA-Z][a-zA-Z0-9_]*)	return 'LITERAL';
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

dataBase: def_table PUNTO_COMA
        | def_values_of PUNTO_COMA;

def_table: LITERAL LPARENT def_values RPARENT;

def_values: def_values COMA properties
			| properties;

properties: LITERAL type;

type: INT
	| DECIMAL
	| STRING
	| BOOLEAN;

def_values_of: def_values_of COMA table_values
			| table_values;

table_values: LITERAL IGUAL operacion1;


operacion1 : operacion1 MAS operacion1
            | operacion1 MENOS operacion1
            | operacion2;
operacion2 : operacion2 POR operacion2
             | operacion2 DIVIDE operacion2
             | operacion3;
operacion3 : ENTERO
            | CADENA
            | operacion4;
operacion4 : L_PARENT operacion1 R_PARENT
               | DECIMAL;

