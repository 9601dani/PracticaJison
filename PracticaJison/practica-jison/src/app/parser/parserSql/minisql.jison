%lex
/*expresiones regulares*/
valor_string        (\"[^\"]*\") | (\'[^\']*\')
variable            "@"[a-zA-Z][a-zA-Z_]*
integer             [0]|[1-9][0-9]*
number              {integer}(\.[0-9]+)?\b
comilla_d           \"
comilla_s           \'
doble_linea_com     "--".*
lparen              "("
rparen              ")"
divide              "/"
times               "*"
minus               "-"
plus                "+"
igual               "="
menor_que           "<"
menor_igual_que     "<="
mayor_que           ">"
mayor_igual_que     ">="
no_equals           "<>"
punto_coma          ";"
coma                ","
/*palabras reservadas*/
INT                 "INT"
DECIMAL             "DECIMAL"
TEXT                "TEXT"
BOOLEAN             "BOOLEAN"
TRUE                "TRUE"
FALSE               "FALSE"
DECLARE             "DECLARE"
AS                  "AS"
SET                 "SET"
AND                 "AND"
INPUT               "INPUT"
PRINT               "PRINT"
IF                  "IF"
ELSEIF              "ELSEIF"
ELSE                "ELSE"
END                 "END"
THEN                "THEN"
NOT                 "NOT"
AND                 "AND"
OR                  "OR"
SELECT              "SELECT"
FROM                "FROM"
WHERE               "WHERE"
LIMIT               "LIMIT"
OFFSET              "OFFSET"
%%
\s+                 /* esapcios en blanco*/
{variable}            return "VARIABLE";
{number}              return "NUMBER";
{comilla_d}           return "COMILLA_DOBLE";
{comilla_s}           return "COMILLA_SIMPLE";
{doble_linea_com}     /* ignorar*/
{lparen}              return "LPAREN";
{rparen}              return "RPAREN";
{divide}              return "DIVIDE";
{times}               return "TIMES";
{minus}               return "MINUS";
{plus}                return "PLUS";
{igual}               return "IGUAL"
{menor_que}           return "MENOR_QUE";
{menor_igual_que}     return "MENOR_IGUAL_QUE";
{mayor_que}           return "MAYOR_QUE";
{mayor_igual_que}     return "MAYOR_IGUAL_QUE";
{no_equals}           return "NO_EQUALS";
{punto_coma}          return "PUNTO_COMA";
{coma}                return "COMA";
/*palabras reservadas*/
{INT}               return "INT";
{DECIMAL}           return "DECIMAL";
{TEXT}              return "TEXT";
{BOOLEAN}           return "BOOLEAN";
{TRUE}              return "TRUE";
{FALSE}             return "FALSE";
{DECLARE}           return "DECLARE";
{AS}                return "AS";
{SET}               return "SET";
{AND}               return "AND";
{INPUT}             return "INPUT";
{PRINT}             return "PRINT";
{IF}                return "IF";
{ELSEIF}            return "ELSEIF";
{ELSE}              return "ELSE";
{END}               return "END";
{THEN}              return "THEN";
{NOT}               return "NOT";
{AND}               return "AND";
{OR}                return "OR";
{SELECT}            return "SELECT";
{FROM}              return "FROM";
{WHERE}             return "WHERE";
{LIMIT}             return "LIMIT";
{OFFSET}            return "OFFSET";
<<EOF>>             %{
                        console.log('fin de archivo');
                        return "EOF";
                    %}
.                   %{
                        console.log(`Error lexico ${yytext}`);
                        return "INVALID";
                    %}
/lex


