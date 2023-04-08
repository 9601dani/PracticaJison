import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";
import {ConditionSelect} from "./condition_select";

export class Select extends Instruction{
  ids:string[];
  name:string;
  limits: ConditionSelect;
  constructor(line:number, column:number, ids:string[],  name:string,limits:ConditionSelect) {
    super(line,column);
    this.ids=ids;
    this.name=name;
    this.limits=limits

  }

  run(table: TablaSimbolos): any {
    //TODO: verificar si existe la tabla con el name
  }

}
