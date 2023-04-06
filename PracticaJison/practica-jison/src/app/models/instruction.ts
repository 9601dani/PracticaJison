import {TablaSimbolos} from "./tabla_simbolos";

export abstract class Instruction{
  line!: number;
  column!: number;

  constructor(line:number, column:number) {
    this.line=line;
    this.column=column;
  }
  abstract run(table:TablaSimbolos):any;

}
