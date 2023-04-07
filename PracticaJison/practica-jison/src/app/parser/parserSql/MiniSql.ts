import {Instruction} from "../../models/instruction";
import {Declare} from "../../models/declare";
import {Print} from "../../models/print";
import {Assingment} from "../../models/assingment";
import {Input} from "../../models/input";
import {OperacionBinaria} from "../../models/operacion_binaria";
import {OperationType} from "../../models/operation_type";
import {Value, ValueType} from "../../models/value";
import {Variable, VariableType} from "../../models/variable";
import {Settear} from "../../models/settear";
import {IfState} from "../../models/if_state";
import {ElseState} from "../../models/else_state";
import {TablaSimbolos} from "../../models/tabla_simbolos";
import {DefManageError} from "../../ManageError/DefManageError";
import {MyErrorsMini} from "../../ManageError/MyErrorsMini";

declare  var minisql:any;
export class MiniSql{
  private instructions: Instruction[]= []
  private source:string;

  constructor(source:string) {
    this.source=source
    MyErrorsMini.getInstanci().clear();
    minisql.yy.MyErrorsMini= MyErrorsMini.getInstanci()
    minisql.yy.DefManageError= DefManageError;
    minisql.yy.Declare= Declare;
    minisql.yy.Input= Input;
    minisql.yy.OperacionBinaria= OperacionBinaria;
    minisql.yy.OperationType= OperationType;
    minisql.yy.Print= Print;
    minisql.yy.Assingment= Assingment;
    minisql.yy.Settear= Settear;
    minisql.yy.Value= Value;
    minisql.yy.ValueType= ValueType;
    minisql.yy.Variable= Variable;
    minisql.yy.VariableType= VariableType;
    minisql.yy.IfState= IfState;
    minisql.yy.ElseState= ElseState;
    console.log(minisql);
  }

  parse():TablaSimbolos| undefined{
    try{
     this.instructions = minisql.parse(this.source);
      let table = new TablaSimbolos();
      if(MyErrorsMini.getInstanci().message_error.length>0){
        return undefined;
      }
      this.instructions.forEach(i =>{
        i.run(table);
      })
/*       console.log(this.instructions);
      console.log(table)

      console.log("retornare la tabla")*/
      console.log(MyErrorsMini.getInstanci())
      return table;
      /*console.log(JSON.stringify(this.instructions))*/
    }catch(error){
      console.log(error)
      console.log(MyErrorsMini.getInstanci())

      return undefined;
    }
  }
}
