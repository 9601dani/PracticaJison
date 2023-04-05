import {DBTable} from "./DBTable";
import {Stmt} from "./Stmt";

export class BaseDeDatos{
  private static instancia: BaseDeDatos;
  array_tables!: Array<DBTable>

  constructor() {
  }
  public clear(){
    this.array_tables=[];
  }
  public static getInstancia(): BaseDeDatos {
    if (!BaseDeDatos.instancia) {
      BaseDeDatos.instancia = new BaseDeDatos();
    }
    return BaseDeDatos.instancia;
  }

  public añadir(table: DBTable){
     if(this.array_tables.find(t=> t.objDb.name_table==table.objDb.name_table)){
          throw new Error("La tabla "+table.objDb.name_table +" ya existe");
    }
    this.array_tables.push(table);
  }

  public getArrayTable():Array<DBTable>{
    return this.array_tables;
  }

}
