import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";

export class Value extends Instruction{
  value:any;
  type!: ValueType;
  constructor(line:number, column:number, value:any, type:ValueType) {
    super(line,column);
    this.value=value;
    this.type=type;
  }

  run(table: TablaSimbolos): any {
  }


}

export enum ValueType{
  ENTERO,
  NUM_DECIMAL,
  CADENA,
  FALSE,
  TRUE,
  VARIABLE,
  LITERAL
}
