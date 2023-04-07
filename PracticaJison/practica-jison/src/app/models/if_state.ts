import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";
import {MyErrorsMini} from "../ManageError/MyErrorsMini";
import {DefManageError} from "../ManageError/DefManageError";

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
  const variable1 = this.instruction.run(table);
  if(!variable1){
    MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","Error de operacion en IF"));
  }
      if(variable1.value==true){
        this.bloque_verdadero?.forEach((elemento)=>{
          elemento.run(table)
        })
      }else{
        this.bloque_falso?.run(table);
      }

  }

}
