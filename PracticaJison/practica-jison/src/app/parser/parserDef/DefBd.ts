import {Statement} from "@angular/compiler";
import {DBTable} from "../../objects/DBTable";
import {Propiedad} from "../../objects/Propiedad";
import {TypePropiedad} from "../../objects/TypePropiedad";
import {Atributo} from "../../objects/Atributo";
import {Stmt} from "../../objects/Stmt";
import {TypeProStmt} from "../../objects/TypeProStmt";
import {DataB} from "../../objects/DataB";
declare var def_bd:any;
export class DefBd{
  private statements : DBTable []=[];
  private source!: string;

  constructor(source:string) {
    this.source=source;
    def_bd.yy.DataB= DataB;
    def_bd.yy.DBTable= DBTable;
    def_bd.yy.Propiedad= Propiedad;
    def_bd.yy.TypePropiedad= TypePropiedad;
    def_bd.yy.Atributo= Atributo;
    def_bd.yy.Stmt= Stmt;
    def_bd.yy.TypeProStmt= TypeProStmt;
  }
  parse() {
    try {
      this.statements = def_bd.parse(this.source);
      this.statements.forEach((elemento:DBTable)=>{
        if(elemento.objDb!=null){
          console.log(elemento)
        }
      })
    } catch(error) {
      console.error(error);
    }
  }
}

