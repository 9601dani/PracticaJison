import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";

export class IfState extends Instruction{

  instruction: Instruction;
  bloque_verdadero?: Instruction[];
  bloque_falso?: Instruction;

  constructor(line: number, column:number, instruccion:Instruction,bloque_verdadero?:Instruction[],bloque_falso?:Instruction) {
    super(line,column);
    this.instruction=instruccion;
    if(bloque_verdadero){
      this.bloque_verdadero=bloque_verdadero;
    }
    if(bloque_falso){
      this.bloque_falso=bloque_falso;
    }

  }
  run(table: TablaSimbolos): any {
  }

}
