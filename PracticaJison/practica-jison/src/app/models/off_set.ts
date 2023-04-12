import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";
import {Variable} from "./variable";

export class OffSet extends Instruction{
  operation:Instruction
  valor!:Variable

  constructor(line:number,column:number,operation:Instruction) {
    super(line,column);
    this.operation=operation;
  }

  run(table: TablaSimbolos): any {
    this.valor= this.operation.run(table)
    return this.valor
  }

}
