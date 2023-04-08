import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";

export class Where extends Instruction{
    operation: Instruction

  constructor(line:number,column:number, operation:Instruction) {
    super(line,column);
    this.operation=operation
  }

  run(table: TablaSimbolos): any {
  }

}
