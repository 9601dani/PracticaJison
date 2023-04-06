import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";

export class Assingment extends Instruction{
  id:string;
  value!:Instruction;

  constructor(line:number, column:number,id:string, value:Instruction) {
    super(line,column);
    this.id=id;
    this.value=value;
  }

  run(table: TablaSimbolos): any {
  }

}
