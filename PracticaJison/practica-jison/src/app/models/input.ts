import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";

export class Input extends Instruction{
  instruction: Instruction;

  constructor(line:number,column:number, instruction: Instruction) {
    super(line,column);
    this.instruction=instruction;
  }

  run(table: TablaSimbolos): any {
  }

}
