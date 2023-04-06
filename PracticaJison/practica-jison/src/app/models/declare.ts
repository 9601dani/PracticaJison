import {Instruction} from "./instruction";
import {ValueType} from "./value";
import {TablaSimbolos} from "./tabla_simbolos";

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
  }

}
