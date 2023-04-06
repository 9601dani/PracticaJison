import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";

export class Input extends Instruction{
  mensaje:string;
  instruction: Instruction;

  constructor(line:number,column:number,mensaje:string, instruction: Instruction) {
    super(line,column);
    this.mensaje=mensaje;
    this.instruction=instruction;
  }

  run(table: TablaSimbolos): any {
  }

}
