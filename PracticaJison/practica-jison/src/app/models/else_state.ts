import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";
import {MyErrorsMini} from "../ManageError/MyErrorsMini";
import {DefManageError} from "../ManageError/DefManageError";

export class ElseState extends Instruction{
  instructions: Instruction[];
  constructor(line:number, column:number,instructions:Instruction[]) {
    super(line,column);

      this.instructions=instructions;

  }
  run(table: TablaSimbolos): any {
    this.instructions.forEach((elemnto)=>{
      elemnto.run(table)
    })
  }

}
