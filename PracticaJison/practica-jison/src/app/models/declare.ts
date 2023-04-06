import {Instruction} from "./instruction";
import {ValueType} from "./value";
import {TablaSimbolos} from "./tabla_simbolos";
import {Variable} from "./variable";

export class Declare extends Instruction{
  type: ValueType;
  id:string[];
  value?:Instruction
  constructor(line:number,column:number,type:ValueType,id:string[],value?:Instruction) {
    super(line,column);
    this.type=type;
    this.id =id;
    if(value){
      this.value=value;
    }

  }

  run(table: TablaSimbolos): any {
    const vairable = table.exist(this.id[0])
    if(vairable){
      throw new Error("la variable declara ya existe")
    }
    const operation: Variable| undefined= this.value?.run(table)
      if(!operation || !operation.value){
        throw new Error("error, la operacio no tiene valor");
      }
     //TODO: validacion del mismo tipo de variable
    let var1= new Variable();
      Object.assign(var1, operation);
      var1.id= this.id[0];
      table.nuevo(var1);
  }

}
