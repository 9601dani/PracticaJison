import {TypePropiedad} from "./TypePropiedad";
import {DBTable} from "./DBTable";

export class TypeProStmt{
  value_property!: any;
  type_property!: TypePropiedad
  constructor(value_property:any, type_property: TypePropiedad) {
    this.value_property=value_property;
    this.type_property= type_property;
  }
}
