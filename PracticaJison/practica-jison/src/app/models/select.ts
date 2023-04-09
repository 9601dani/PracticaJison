import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";
import {ConditionSelect} from "./condition_select";
import {BaseDeDatos} from "../objects/BaseDeDatos";
import {DBTable} from "../objects/DBTable";
import {MyErrorsMini} from "../ManageError/MyErrorsMini";
import {DefManageError} from "../ManageError/DefManageError";
import {Stmt} from "../objects/Stmt";

export class Select extends Instruction{
  tabla_seleccionada!: DBTable| string
  encontrado:boolean=false;
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
    let tabla_seleccionada:DBTable|undefined;
    let respuesta_consulta=[];
    try {
      this.tabla_seleccionada=this.seleccionarTabla();
      if(this.tabla_seleccionada== "NO"){
        /*regreso error de que no se encontro la tabla*/
        MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","La tabla *"+this.name+"* no existe"));
      }else{
        if(this.ids[0]=="*"){
          //TODO: aqui solicito todos los campos
        }else{
          //TODO: comprobar que los ids sean los que pide;
          for (let i=0; i< this.ids.length;i++){
            (this.tabla_seleccionada as DBTable).objDb.propiedades.forEach((stmt)=>{
              if(stmt.name_property== this.ids[i]){
                this.encontrado=true;
              }
            })
            if(!this.encontrado){
              MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.line,"Semantico","Al parecer el campo *"+this.ids[i]+"* no existe en la tabla "+this.name));
              return
            }else{
              this.encontrado=false;
              /*aqui encontro el dato*/
            }
          }
         /* for (let i=0;i<this.ids.length;i++){
             respuesta_consulta.push()
          }*/
          for (let i=0; i< this.ids.length;i++){
            (this.tabla_seleccionada as DBTable).statem.forEach((registro)=>{
              /*for(let j=0;j<registro.statemens.length;j++){
                respuesta_consulta.push(tabla_seleccionada?.statem.filter((elemento)=> elemento.statemens[i].name_atribute=== this.ids[i]))
              }*/

            })
          }

        }


       /* if(!this.encontrado){
          /!*MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.line,"Semantico","Al parecer el campo no existen en la tabla"));*!/
          return
        }*/
        console.log(this.tabla_seleccionada)
      }
    }catch (erro){
      console.log(erro)
      MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.line,"Semantico","Al parecer no existe una base de datos para realziar la consulta"));
      return
    }



  }

  seleccionarTabla():DBTable|string{
    let base_datos= BaseDeDatos.getInstancia().array_tables;
    let select_table:string= "NO";
    // @ts-ignore
    for(let i=0; i<base_datos.length;i++){
      if(this.name==base_datos[i].objDb.name_table){
        return base_datos[i]
      }
    }
    return select_table
  }

}
