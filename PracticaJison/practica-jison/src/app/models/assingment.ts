import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";
import {Variable, VariableType} from "./variable";
import {MyErrorsMini} from "../ManageError/MyErrorsMini";
import {DefManageError} from "../ManageError/DefManageError";

export class Assingment extends Instruction{
  id:string;
  value:Instruction;

  constructor(line:number, column:number,id:string, value:Instruction) {
    super(line,column);
    this.id=id;
    this.value=value;


  }

  run(table: TablaSimbolos): any {
    const variable1= table.getWithId(this.id);
    if(!variable1){
      MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.value.line,this.value.column,"Semantico","La variable "+this.id+" no esta definida"));
     /* throw new Error("esta variable no esta definida ->"+variable1+" -> "+this.id+" "+this.value.line +" - "+ this.value?.line)*/

    }else{
      const operation= this.value.run(table)
      if(!operation){
        MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.value.line,this.value.column,"Semantico","La asignacion no tiene un valor especifico"));
        /*throw new Error("error, la en asignacion no tiene valor=>");*/
      }
      if(this.verificarTipo(variable1,operation)){
        variable1.value= operation.value;
      }else{
        if(variable1.type== VariableType.DECIMAL){
          if(operation.type == VariableType.INT){
            variable1.value= operation.value;
          }
        }else if(variable1.type== VariableType.INT){
          if(operation.type== VariableType.DECIMAL){
            variable1.value= Math.floor(operation.value);
          }
        }else{
          MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.value.line,this.value.column,"Semantico","No se puede asignar una variable "+variable1.mostrarVariable(variable1.type)+" a una variable "+operation.mostrarVariable(operation.type)));
        }
    }

    }
  }
  verificarTipo(variable1: Variable, operation:Variable):Boolean{
    if(variable1.type== operation.type){
      return true;
    }
    return false;
  }

}
