import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";

export class ElseState extends Instruction{
  instructions?: Instruction;
  constructor(line:number, column:number,instructions?:Instruction) {
    super(line,column);
    if(instructions){
      this.instructions=instructions;
    }
  }
  run(table: TablaSimbolos): any {
  }

}
