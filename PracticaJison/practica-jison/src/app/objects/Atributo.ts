import {Propiedad} from "./Propiedad"
import {Stmt} from "./Stmt";
import {TypeProStmt} from "./TypeProStmt";

export  class Atributo{
  property!: TypeProStmt;
  name_atribute: any;
  constructor(property: TypeProStmt, value : any){
    this.property= property;
    this.name_atribute= value;
  }
}
