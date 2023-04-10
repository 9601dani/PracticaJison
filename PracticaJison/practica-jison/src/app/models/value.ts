import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";
import {Variable, VariableType} from "./variable";
import {MyErrorsMini} from "../ManageError/MyErrorsMini";
import {DefManageError} from "../ManageError/DefManageError";

export class Value extends Instruction{
  value:any;
  type!: ValueType;
  constructor(line:number, column:number, value:any, type:ValueType) {
    super(line,column);
    this.value=value;
    this.type=type;
  }

  run(table: TablaSimbolos): Variable| undefined {
    let variable= new Variable();
    switch (this.type){
      case ValueType.ENTERO:
        variable.type= VariableType.INT;
        variable.value= Number(this.value);
        return variable;
      case ValueType.NUM_DECIMAL:
        variable.type= VariableType.DECIMAL;
        variable.value= Number(this.value);
        return  variable;
      case ValueType.CADENA:
        variable.type= VariableType.TEXT;
        variable.value= String(this.value);
        return  variable;
      case ValueType.BOOLEAN:
        variable.type= VariableType.BOOLEAN;
        variable.value= Boolean(this.value);
        return  variable;
      case ValueType.LITERAL:
        variable.type= VariableType.TEXT;
        variable.value= String(this.value);
        return  variable;
      case ValueType.VARIABLE:
        const vari= table.getWithId(String(this.value));
        if(!vari){
          throw new Error(`Variable ${this.value} no ha sido declarada anteriormente`)
        }
        Object.assign(variable,vari);
        return variable;
    }
   /* console.log("retorne undefined")*/
    return undefined;

  }


}

export enum ValueType{
  ENTERO,
  NUM_DECIMAL,
  CADENA,
  FALSE,
  TRUE,
  VARIABLE,
  LITERAL,
  BOOLEAN
}
