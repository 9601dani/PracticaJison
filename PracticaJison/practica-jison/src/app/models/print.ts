import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";

export class Print extends Instruction{
  instructions: Array<Instruction>
  constructor(line:number,column:number,instructions:Array<Instruction>) {
    super(line,column);
    this.instructions=instructions;
  }

  run(table: TablaSimbolos): any {
  }
}
