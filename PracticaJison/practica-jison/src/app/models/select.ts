import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";
import {ConditionSelect} from "./condition_select";
import {BaseDeDatos} from "../objects/BaseDeDatos";
import {DBTable} from "../objects/DBTable";
import {MyErrorsMini} from "../ManageError/MyErrorsMini";
import {DefManageError} from "../ManageError/DefManageError";
import {Stmt} from "../objects/Stmt";
import {Atributo} from "../objects/Atributo";
import {Consulta} from "../objects/Consulta";
import {DataB} from "../objects/DataB";
import {Propiedad} from "../objects/Propiedad";
import {ConsultaFinal} from "../objects/ConsultaFinal";
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
          if(this.limits.statement_limit){
            const limit = this.limits.statement_limit.run(table)
            if(limit){
              const stms:Array<Stmt>=[]
              const st:Array<Atributo>=[]
              if(this.limits.statement_off_set){
                const offset= this.limits.statement_off_set.run(table)
                if(offset){
                  for (let i=offset.value; i<(this.tabla_seleccionada as DBTable).statem.length;i++){
                    if(i>offset.value+limit.value-1){
                      break;
                    }

                    /*              console.log((this.tabla_seleccionada as DBTable).statem[i].statemens)*/
                    stms.push((this.tabla_seleccionada as DBTable).statem[i])
                  }
                }
              }else{
                for (let i=0; i<(this.tabla_seleccionada as DBTable).statem.length;i++){
                  if(i>limit.value-1){
                    break;
                  }

                  /*              console.log((this.tabla_seleccionada as DBTable).statem[i].statemens)*/
                  stms.push((this.tabla_seleccionada as DBTable).statem[i])
                }
              }
              let nData=new DBTable(new DataB((this.tabla_seleccionada as DBTable).objDb.name_table,(this.tabla_seleccionada as DBTable).objDb.propiedades))
              nData.statem= stms
              ConsultaFinal.getInstanciaConsultas().consultas.push(nData);
            }else{
             /* console.log(this.limits.statement_limit.valor.value)*/
              MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.line,"Semantico","La condicion de LIMIT no tiene un valor valido "));
              return
            }
          }else if(this.limits.statement_off_set){

              const offset= this.limits.statement_off_set.run(table)
              const stms:Array<Stmt>=[]
              if(offset){
                console.log(offset.value)
                for (let i=offset.value; i<(this.tabla_seleccionada as DBTable).statem.length;i++){
                  /*              console.log((this.tabla_seleccionada as DBTable).statem[i].statemens)*/
                  stms.push((this.tabla_seleccionada as DBTable).statem[i])
                }
                let nData=new DBTable(new DataB((this.tabla_seleccionada as DBTable).objDb.name_table,(this.tabla_seleccionada as DBTable).objDb.propiedades))
                nData.statem= stms
                ConsultaFinal.getInstanciaConsultas().consultas.push(nData);
              }
          }else{
            ConsultaFinal.getInstanciaConsultas().consultas.push((this.tabla_seleccionada as DBTable))
          }

        }else{
          //TODO: comprobar que los ids sean los que pide;
          let propiedasd_nueva:Array<Propiedad>=[];
          for (let i=0; i< this.ids.length;i++){
            (this.tabla_seleccionada as DBTable).objDb.propiedades.forEach((stmt)=>{
              if(stmt.name_property== this.ids[i]){
                propiedasd_nueva.push(stmt)
                this.encontrado=true;
              }
            })
          }
            if(!this.encontrado){
              MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.line,"Semantico","Al parecer el campo  no existe en la tabla "+this.name));
              return
            }else{
              const nueva_dbTable = new DBTable(new DataB((this.tabla_seleccionada as DBTable).objDb.name_table, propiedasd_nueva));
              let nuevo_array_atris: Array<Atributo>=[]
              let nuevo_array_stm:Stmt[]=[]
              this.encontrado=false;
              (this.tabla_seleccionada as DBTable).statem.forEach((statem)=>{
                statem.statemens.forEach((array_nuevo)=>{
                  for (let i=0;i<this.ids.length;i++){
                    if(array_nuevo.name_atribute== this.ids[i]){
                      nuevo_array_atris.push(new Atributo(array_nuevo.property,array_nuevo.name_atribute))
                    }
                  }

                })
                nuevo_array_stm.push(new Stmt(nuevo_array_atris))
                nuevo_array_atris=[]
              })

              nueva_dbTable.statem=(nuevo_array_stm)
              this.tabla_seleccionada= nueva_dbTable
              /*aqui encontro el dato*/
            }
          if(this.limits.statement_limit){
            const limit = this.limits.statement_limit.run(table)
            if(limit){
              const stms:Array<Stmt>=[]
              const st:Array<Atributo>=[]
              if(this.limits.statement_off_set){
                const offset= this.limits.statement_off_set.run(table)
                if(offset){
                  for (let i=offset.value; i<(this.tabla_seleccionada as DBTable).statem.length;i++){
                    if(i>offset.value+limit.value-1){
                      break;
                    }

                    /*              console.log((this.tabla_seleccionada as DBTable).statem[i].statemens)*/
                    stms.push((this.tabla_seleccionada as DBTable).statem[i])
                  }
                }
              }else{
                for (let i=0; i<(this.tabla_seleccionada as DBTable).statem.length;i++){
                  if(i>limit.value-1){
                    break;
                  }

                  /*              console.log((this.tabla_seleccionada as DBTable).statem[i].statemens)*/
                  stms.push((this.tabla_seleccionada as DBTable).statem[i])
                }
              }
              let nData=new DBTable(new DataB((this.tabla_seleccionada as DBTable).objDb.name_table,(this.tabla_seleccionada as DBTable).objDb.propiedades))
              nData.statem= stms
              ConsultaFinal.getInstanciaConsultas().consultas.push(nData);
            }else{
              /* console.log(this.limits.statement_limit.valor.value)*/
              MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.line,"Semantico","La condicion de LIMIT no tiene un valor valido "));
              return
            }
          }else if(this.limits.statement_off_set){

            const offset= this.limits.statement_off_set.run(table)
            const stms:Array<Stmt>=[]
            if(offset){
              console.log(offset.value)
              for (let i=offset.value; i<(this.tabla_seleccionada as DBTable).statem.length;i++){
                /*              console.log((this.tabla_seleccionada as DBTable).statem[i].statemens)*/
                stms.push((this.tabla_seleccionada as DBTable).statem[i])
              }
              let nData=new DBTable(new DataB((this.tabla_seleccionada as DBTable).objDb.name_table,(this.tabla_seleccionada as DBTable).objDb.propiedades))
              nData.statem= stms
              ConsultaFinal.getInstanciaConsultas().consultas.push(nData);
            }
          }else{
            ConsultaFinal.getInstanciaConsultas().consultas.push((this.tabla_seleccionada as DBTable))
          }

        }
      }
        return

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
    if(base_datos){
      for(let i=0; i<base_datos.length;i++){
        if(this.name==base_datos[i].objDb.name_table){
          return base_datos[i]
        }
      }
      return select_table
    }
   return "NO"
  }

}
