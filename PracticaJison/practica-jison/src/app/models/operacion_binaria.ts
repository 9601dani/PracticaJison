import {Instruction} from "./instruction";
import {OperationType} from "./operation_type";
import {TablaSimbolos} from "./tabla_simbolos";
import {Variable, VariableType} from "./variable";
import {MyErrorsMini} from "../ManageError/MyErrorsMini";
import {DefManageError} from "../ManageError/DefManageError";

export class OperacionBinaria extends Instruction{
  type : OperationType;
  operador_izquierdo: Instruction;
  operador_derecho?: Instruction;

  constructor(line:number,column:number, type:OperationType, operador_izquierdo:Instruction, operador_derecho?:Instruction) {
    super(line,column);
    this.type=type;
    this.operador_izquierdo=operador_izquierdo;
    if(operador_derecho){
      this.operador_derecho=operador_derecho;
    }

  }

  run(table: TablaSimbolos): Variable| undefined {
    const left: Variable|undefined= this.operador_izquierdo.run(table); /*ira a value para saber el valor*/
    const  right:Variable|undefined= this.operador_derecho?.run(table);
    let variable = new Variable();
    if(left && right){
        const tpe= left.type=== VariableType.DECIMAL || right.type=== VariableType.DECIMAL
        ? VariableType.DECIMAL
        : VariableType.INT;
        variable.type= tpe;
        switch (this.type){
          case OperationType.MAS:
            if(this.verificarOperaciones(left,right)){
              variable.value= Number(left.value)+Number(right.value);
              variable.type= this.tipoRetornar(left,right,variable);
              return variable;
              //TODO: aqui va la verificacion de que type retorna
            }else {
              /*throw new Error("Solamente puedes realizar sumas con INT y DECIMAL");*/
              MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","Solo puedes realizar sumas con INT y DECIMAL"));
              return
            }

          case OperationType.MENOS:
            if(this.verificarOperaciones(left,right)){
              variable.value= Number(left.value)-Number(right.value);
              variable.type= this.tipoRetornar(left,right,variable);
              //TODO: aqui va la verificacion de que type retorna
              return variable;
            }else {
              /*throw new Error("Solamente puedes realizar restas con INT y DECIMAL");*/
              MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","Solo puedes realizar restas con INT y DECIMAL"));
              return
            }

          case OperationType.DIVIDE:
            if(this.verificarOperaciones(left,right)){
              if(Number(right.value)!=0){
                variable.value= Number(left.value)/Number(right.value);
                variable.type= VariableType.DECIMAL
                //TODO: aqui va la verificacion de que type retorna
                return variable;
              }else{
                MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","No puedes dividir por 0"));
                return
              }

            }else {
              /*throw new Error("Solamente puedes realizar divisiones con INT y DECIMAL");*/
              MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","Solo puedes realizar divisiones con INT y DECIMAL"));
              return
            }

          case OperationType.POR:
            if(this.verificarOperaciones(left,right)){
              variable.value= Number(left.value)*Number(right.value);
              variable.type= this.tipoRetornar(left,right,variable);
              //TODO: aqui va la verificacion de que type retorna
              return variable;
            }else {
             /* throw new Error("Solamente puedes realizar multiplicaciones con INT y DECIMAL");*/
              MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","Solo puedes realizar multiplicaciones con INT y DECIMAL"));
              return
            }
          case OperationType.OR:
            variable.value= Boolean(left.value) || Boolean(right.value);
            variable.type= VariableType.BOOLEAN;
            return variable;
          case OperationType.AND:
            variable.value= Boolean(left.value) && Boolean(right.value);
            variable.type= VariableType.BOOLEAN;
            return variable;
          case OperationType.NO_IGUAL:
            variable.type= VariableType.BOOLEAN;
            variable.value= (left.value != right.value);
            return variable;
          case OperationType.IGUAL:
            variable.type= VariableType.BOOLEAN;
            variable.value= left.value == right.value;
            return variable;
          case OperationType.MENOR_QUE:
            if(this.verificarDatosRelacionales(left, right)){
              variable.type= VariableType.BOOLEAN;
              variable.value= Number(left.value) < Number(right.value);
              return variable;
            }else{
             /* throw new Error("< solamente con datos INT y DECIMAL")*/
              MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","con < solamente pueden ser con datos INT y DECIMAL"));
              return
            }

          case OperationType.MENOR_IGUAL_QUE:
            if(this.verificarDatosRelacionales(left,right)){
              variable.type= VariableType.BOOLEAN;
              variable.value= Number(left.value) <= Number(right.value);
              return variable;
            }else{
             /* throw new Error("<= solamente con datos INT y DECIMAL")*/
              MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","con <= solamente pueden ser con datos INT y DECIMAL"));
              return
            }

          case OperationType.MAYOR_QUE:
            if(this.verificarDatosRelacionales(left,right)){
              variable.type= VariableType.BOOLEAN;
              variable.value= Number(left.value) > Number(right.value);
              return variable;
            }else{
              /*throw new Error("> solamente con datos INT y DECIMAL")*/
              MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","con > solamente pueden ser con datos INT y DECIMAL"));
              return
            }

          case OperationType.MAYOR_IGUAL_QUE:
            if(this.verificarDatosRelacionales(left,right)){
              variable.type= VariableType.BOOLEAN;
              variable.value= Number(left.value) >= Number(right.value);
              return variable;
            }else{
             /* throw new Error(">= solamente con datos INT y DECIMAL")*/
              MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","con >= solamente pueden ser con datos INT y DECIMAL"));
              return
            }

        }
    }
    throw new Error("Errores en la operacion")
  }

  verificarOperaciones(left:Variable, right: Variable):Boolean{
      if(left.type=== VariableType.TEXT){
        return false;
      }
      if(left.type=== VariableType.BOOLEAN){
      return false;
      }
    if(right.type=== VariableType.TEXT){
      return false;
    }
    if(right.type=== VariableType.BOOLEAN){
      return false;
    }
    return true;
  }

  tipoRetornar(left:Variable, right:Variable, variable:Variable):VariableType{
    return variable.type = (left.type == VariableType.DECIMAL || right.type == VariableType.DECIMAL)?
      VariableType.DECIMAL : VariableType.INT;
  }

  verificarDatosRelacionales(left:Variable, right:Variable):Boolean{
      if(left.type===VariableType.TEXT){return false;}
      if(left.type=== VariableType.BOOLEAN){return false;}
      if(right.type=== VariableType.TEXT){return false;}
      if(right.type=== VariableType.BOOLEAN){return false;}
    return true;

  }
}

