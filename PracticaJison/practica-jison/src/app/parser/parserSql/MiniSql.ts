import {Instruction} from "../../models/instruction";
import {Declare} from "../../models/declare";
import {Print} from "../../models/print";
import {Assingment} from "../../models/assingment";
import {Input} from "../../models/input";
import {OperacionBinaria} from "../../models/operacion_binaria";
import {OperationType} from "../../models/operation_type";
import {Value, ValueType} from "../../models/value";
import {Variable, VariableType} from "../../models/variable";
import {Settear} from "../../models/Settear";

declare  var minisql:any;
export class MiniSql{
  private instructions: Instruction[]= []
  private source:string;

  constructor(source:string) {
    this.source=source
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
    console.log(minisql);
  }

  parse(){
    try{
     this.instructions = minisql.parse(this.source);
      console.log(this.instructions)
    }catch(error){
      console.log(error)
    }
  }
}