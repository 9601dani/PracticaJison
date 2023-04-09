%{
var myObject;
var ex=false;
var tamaño=0;
let errores_lexicos=[];
  function addError(linea, columna,simbolo){
    var n={
      linea: linea,
      columna:columna,
      type: "Lexico",
      des: "simbolo no reconocido => "+simbolo
    }
    errores_lexicos.push(n);
  }
  function mostrarVariable(num) {
    switch (num){
      case 0:
        return "INT"
      case 1:
        return "STRING"
      case 2:
        return "DECIMAL"
      case 3:
        return "BOOLEAN"
    }
    return "null"
  }

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
                        return 'EOF';
                    %}
.                   %{
                        addError(yylloc.first_line, yylloc.first_column, yytext)
                        return 'INVALID';
                    %}
/lex
%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDE'
%start inic
%%
inic : instruc EOF
      %{
          for(let i=0;i<errores_lexicos.length;i++){
               yy.MyErrors.nuevoE(new yy.DefManageError(errores_lexicos[i].linea,errores_lexicos[i].columna,errores_lexicos[i].type,errores_lexicos[i].des))
            }
            errores_lexicos=[];
      %}
      | EOF
    %{
    for(let i=0;i<errores_lexicos.length;i++){
            yy.MyErrors.nuevoE(new yy.DefManageError(errores_lexicos[i].linea,errores_lexicos[i].columna,errores_lexicos[i].type,errores_lexicos[i].des))
          }
          errores_lexicos=[];
    %}

;

instruc : instruc data_base
      %{
      $$ = $1; $$.push($2);
      %}
			| data_base
			%{ $$ = [];
			$$.push($1);
			%}
;

data_base
  : def_table  %{ myObject= $$ = new yy.DBTable($1);
        try{
            yy.BaseDeDatos.añadir(new yy.DBTable($1));
        }
        catch(e){
           yy.MyErrors.nuevoE(new yy.DefManageError(this._$.first_line,this._$.first_column,"Semantico"," "+e));
        }
  %}
  | def_table_of PUNTO_COMA %{
         let tablas = yy.BaseDeDatos.getArrayTable();
            if(tablas.length===0){
                yy.MyErrors.nuevoE(new yy.DefManageError(this._$.first_line,this._$.first_column,"Semantico"," no hay una tabla definida anteriormente "));
            }else{
              let table= tablas[tablas.length-1];
              if(tablas[tablas.length-1].objDb.propiedades.length === tamaño){
                table.statem.push($1);
                tamaño=0;
              }else{
                    yy.MyErrors.nuevoE(new yy.DefManageError(this._$.first_line,this._$.first_column,"Semantico"," El numero de atributos requeridos no es igual "));
              }

            }
    %}
    | error
                 %{
                             yy.MyErrors.nuevoE(new yy.DefManageError(this._$.first_line,this._$.first_column,"Sintactico"," se obtuvo "+ yytext +" pero no se esperaba"));
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
           : def_table_of  def_values_of PUNTO_COMA  %{
                if(!ex){
                   $$ = $1
                   $$.push($2)
                   tamaño= $2.length;
                }
                ex=false;
           %}
           | def_values_of  %{$$ = []; ;
                      if(!ex){
                      tamaño= $1.length;
                        $$.push($1)
                      }
                      ex=false;
           %}
;

def_values_of: def_values_of COMA table_values %{

                      for(let i=0; i<$$.length; i++){
                          if ($$[i].name_atribute===$3.name_atribute){
                           yy.MyErrors.nuevoE( new yy.DefManageError(this._$.first_line,this._$.first_column,"Semantico","El campo "+$3.name_atribute+" ya se definio una vez"));
                          ex=true;
                          break;
                          }
                      }
                      const propiedad = yy.BaseDeDatos.getArrayTable()
                                              const yys=propiedad[propiedad.length-1].objDb.propiedades.find(elem=> elem.name_property=== $3.name_atribute)
                                                    if(!yys){
                                                     yy.MyErrors.nuevoE( new yy.DefManageError(this._$.first_line,this._$.first_column,"Semantico","El campo "+$3.name_atribute+" no existe en la tabla"));
                                                     ex=true;
                                                    }else{
                                                                                       if($3.property.type_property != yys.type_property){
                                                                                        yy.MyErrors.nuevoE( new yy.DefManageError(this._$.first_line,this._$.first_column,"Semantico","El campo "+$3.name_atribute+" debe ser de tipo "+ mostrarVariable(yys.type_property)));
                                                                                      ex=true;
                                                                                       }

                                                                                       }
                      if(!ex){
                          $$ = $1;
                          $$.push($3);

                      }else{
                      ex=false;
                      }
              %}
			| table_values %{
                      for(let i=0; i<$$.length; i++){
                        if ($$[i].name_atribute===$1.name_atribute){
                          yy.MyErrors.nuevoE(new yy.DefManageError(this._$.first_line,this._$.first_column,"Semantico","El campo "+$1.name_atribute+" ya se definio una vez"));
                          ex=true;
                          break;
                        }
                      }
                       const propiedads = yy.BaseDeDatos.getArrayTable()
                       const yyss=propiedads[propiedads.length-1].objDb.propiedades.find(elem=> elem.name_property=== $1.name_atribute)
                             if(!yyss){
                              yy.MyErrors.nuevoE( new yy.DefManageError(this._$.first_line,this._$.first_column,"Semantico","El campo "+$1.name_atribute+" no existe en la tabla"));
                              ex=true;
                             }else{
                                  if($1.property.type_property != yyss.type_property){
                                   yy.MyErrors.nuevoE( new yy.DefManageError(this._$.first_line,this._$.first_column,"Semantico","El campo "+$1.name_atribute+" debe ser de tipo "+mostrarVariable( yyss.type_property)));
                                     ex=true;
                                  }

                                  }

                        if(!ex){
                          $$ = [];
                          $$.push($1);
                        }else{
                        ex=false;
                        }
			                %}
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
  | MAS h {$$ = new yy.TypeProStmt($1, yy.TypePropiedad.DECIMAL);}
  | h {$$=$1}
;

h:  ENTERO {$$ = new yy.TypeProStmt($1, yy.TypePropiedad.INT);}
    | NUM_DECIMAL {$$ = new yy.TypeProStmt($1, yy.TypePropiedad.DECIMAL);}
    | CADENA {$$ = new yy.TypeProStmt($1, yy.TypePropiedad.STRING);}
    | FALSE {$$ = new yy.TypeProStmt($1, yy.TypePropiedad.BOOLEAN);}
    | TRUE {$$ = new yy.TypeProStmt($1, yy.TypePropiedad.BOOLEAN);}
    | LPARENT a RPARENT {$$ = $2 }
;




