import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";
import {Assingment} from "./assingment";

export class Settear extends Instruction{
  assignments:Array<Assingment>;

  constructor(line:number,column:number,assignments:Array<Assingment>) {
    super(line,column);
    this.assignments=assignments;

  }

  run(table: TablaSimbolos): any {
  }

}
