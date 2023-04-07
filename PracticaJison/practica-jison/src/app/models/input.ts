import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";
import {Variable, VariableType} from "./variable";

export class Input extends Instruction{
  mensaje:string;
  instruction?: Instruction;

  constructor(line:number,column:number,mensaje:string, instruction?: Instruction) {
    super(line,column);
    this.mensaje=mensaje;
    if (instruction){
      this.instruction=instruction;
    }

  }

  run(table: TablaSimbolos): any {
    let variable= new Variable();
    let inp= prompt(this.mensaje)
    if(inp){
        let isNm= Number(inp)
        if(Number.isInteger(isNm)){
          variable.type= VariableType.INT
          variable.value=Number(inp)
          return variable;
        }else if(Number.isNaN(isNm)){
            let isBolean= Boolean(inp)
          if(inp=="FALSE" || inp=="false" || inp=="TRUE" ||inp=="true"){
            variable.type= VariableType.BOOLEAN
            variable.value=Boolean(inp)
            return variable;
          }else{
            variable.type= VariableType.TEXT
            variable.value=String(inp)
            return variable;
          }
        }else{
          variable.type= VariableType.DECIMAL
          variable.value=Number(inp)
          return variable;
        }
    }
  }

}
