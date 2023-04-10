import {Statement} from "@angular/compiler";
import {DBTable} from "../../objects/DBTable";
import {Propiedad} from "../../objects/Propiedad";
import {TypePropiedad} from "../../objects/TypePropiedad";
import {Atributo} from "../../objects/Atributo";
import {Stmt} from "../../objects/Stmt";
import {TypeProStmt} from "../../objects/TypeProStmt";
import {DataB} from "../../objects/DataB";
import {BaseDeDatos} from "../../objects/BaseDeDatos";
import {DefManageError} from "../../ManageError/DefManageError";
import {MyErrors} from "../../ManageError/MyErrors";
declare var def_bd:any;
export class DefBd{
  private statements : DBTable []=[];
  private source!: string;

  constructor(source:string) {
    this.source=source;
    BaseDeDatos.getInstancia().clear();
    MyErrors.getInstanci().clear();
    def_bd.yy.MyErrors= MyErrors.getInstanci();
    def_bd.yy.BaseDeDatos= BaseDeDatos.getInstancia();
    def_bd.yy.DataB= DataB;
    def_bd.yy.DBTable= DBTable;
    def_bd.yy.Propiedad= Propiedad;
    def_bd.yy.TypePropiedad= TypePropiedad;
    def_bd.yy.Atributo= Atributo;
    def_bd.yy.Stmt= Stmt;
    def_bd.yy.TypeProStmt= TypeProStmt;
    def_bd.yy.DefManageError= DefManageError;
  }
  parse() {
    try {
      var array: Array<DBTable>=[]
      this.statements = def_bd.parse(this.source);
      /*if(this.statements!=undefined){
        this.statements.forEach((elemento:DBTable)=>{
          if(elemento.objDb!=null){
            array.push(elemento);
          }
        });
      }*/
      /*var models= new BaseDeDatos(array);*/
      /*ESTE METODO SE DEBE QUITAR*/
      /*console.log(BaseDeDatos.getInstancia());*/
    } catch(error) {
     console.error(error);
    }
  }
}

