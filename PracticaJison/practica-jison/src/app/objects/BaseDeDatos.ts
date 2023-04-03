import {DBTable} from "./DBTable";

export class BaseDeDatos{
  array_tables!: Array<DBTable>

  constructor(array_tables: Array<DBTable>) {
    this.array_tables=array_tables
    console.log(this.array_tables);
  }

}
