import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";
import {Assingment} from "./assingment";

export class Settear extends Instruction{
  assignments:Array<Assingment>;

  constructor(line:number,column:number,assignments:Array<Assingment>) {
    super(line,column);
    this.assignments=assignments;

  }

  run(table: TablaSimbolos): any {
    if(this.assignments.length==1){
      this.assignments[0].run(table);
    }else{
      this.assignments.forEach((elemento)=>{
        elemento.run(table);
      })
    }

  }

}
