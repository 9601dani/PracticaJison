import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";
import {Where} from "./where";
import {Limit} from "./limit";
import {OffSet} from "./off_set";

export class ConditionSelect{
  statement_where:Where;
  statement_limit:Limit;
  statement_off_set:OffSet;

  constructor(line:number, column:number, statement_where:Where,statement_limit:Limit,statement_off_set:OffSet) {
    this.statement_where= statement_where
    this.statement_limit= statement_limit
    this.statement_off_set= statement_off_set
  }

}
