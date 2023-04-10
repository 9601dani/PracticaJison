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
            if(this.limits.statement_limit.valor.value){
              /*console.log("solo devovlere "+this.limits.statement_limit.valor.value)
              let statem !: Array<Propiedad>
              let sta: Array<Stmt>=[]
              let stms= new DBTable(new DataB((this.tabla_seleccionada as DBTable).objDb.name_table,statem));
              for (let i=0;i<(this.tabla_seleccionada as DBTable).statem.length;i++){
                if(i< this.limits.statement_limit.valor.value){
                  sta.push((this.tabla_seleccionada as DBTable).statem[i])
                }
              }
              Consulta.getInstanciaConsultas().array_statemts=(sta)
              ConsultaFinal.getInstanciaConsultas().consultas.push(Consulta.getInstanciaConsultas())*/
              const array=( tabla_seleccionada?.statem.slice(0,this.limits.statement_limit.valor.value))
              if (array){
                Consulta.getInstanciaConsultas().array_statemts.push(array);
                ConsultaFinal.getInstanciaConsultas().consultas.push()
              }


            }else{
              console.log(this.limits.statement_limit.valor.value)
            }
          }else{
            /*aqui va si no hay limite*/
          }

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
          if(this.limits.statement_limit){
            const limit = this.limits.statement_limit.run(table)
            if(this.limits.statement_limit.valor.value){
             /* console.log("solo devovlere "+this.limits.statement_limit.valor.value)
              let statem !: Array<Propiedad>
              let sta: Array<Stmt>=[]
              let stms= new DBTable(new DataB((this.tabla_seleccionada as DBTable).objDb.name_table,statem));
              for (let i=0;i<(this.tabla_seleccionada as DBTable).statem.length;i++){
                if(i< this.limits.statement_limit.valor.value){
                  sta.push((this.tabla_seleccionada as DBTable).statem[i])
                }
              }
              Consulta.getInstanciaConsultas().array_statemts=(sta)
              ConsultaFinal.getInstanciaConsultas().consultas.push(Consulta.getInstanciaConsultas())*/
              const array=( tabla_seleccionada?.statem.slice(0,this.limits.statement_limit.valor.value))
              if (array){
                Consulta.getInstanciaConsultas().array_statemts.push(array);
                ConsultaFinal.getInstanciaConsultas().consultas.push()
              }
            }else{
              console.log(this.limits.statement_limit.valor.value)
            }
          }else{
           /*aqui va si no hay limite*/
          }
        }

         /* let nm=0;
          console.log(this.limits.statement_limit.valor+"algo aqui")
        if(this.limits.statement_limit.valor.value){
          for (let i=0;i<(this.tabla_seleccionada as DBTable).statem.length;i++){
            if(i< this.limits.statement_limit.valor.value){
              Consulta.getInstanciaConsultas().array_statemts.push((this.tabla_seleccionada as DBTable).statem[i])
            }

          }
        }*/




         /* for (let i=0;i<this.ids.length;i++){
             respuesta_consulta.push()
          }*/
        /*  for (let i=0; i< this.ids.length;i++){
            (this.tabla_seleccionada as DBTable).statem.forEach((registro)=>{
              /!*for(let j=0;j<registro.statemens.length;j++){
                respuesta_consulta.push(tabla_seleccionada?.statem.filter((elemento)=> elemento.statemens[i].name_atribute=== this.ids[i]))
              }*!/
              //TODO hay que hacer nuevo array con los ids


            })
          }*/
        /* const nueva= (this.tabla_seleccionada as DBTable).statem.map(dato => dato.statemens.forEach((elemento)=>  this.ids.forEach((ele)=> ele== elemento.name_atribute)))*/

         /* (this.tabla_seleccionada as DBTable).statem.forEach((elem)=>{
            for(let i=0;elem.statemens.length;i++){
              const extrac= this.ids.map(prop=> elem.statemens[i].name_atribute)
            }
          })*/


        }
       /* const selectedProperties = elem.statemens.map(person => {
          const filteredProps = Object.keys(person)
            .filter(prop => this.ids.includes(prop))
            .reduce((obj, prop) => {
              obj.name_atribute[prop] = person.name_atribute[prop];
              return obj;
            }, {} as Partial<Atributo>);
          return filteredProps;
        });
        console.log("-"+selectedProperties)*/


       /* if(!this.encontrado){
          /!*MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.line,"Semantico","Al parecer el campo no existen en la tabla"));*!/
          return
        }*/
        /*console.log( "-"+Consulta.getInstanciaConsultas().array_statemts)
        console.log(this.tabla_seleccionada)*/


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
    for(let i=0; i<base_datos.length;i++){
      if(this.name==base_datos[i].objDb.name_table){
        return base_datos[i]
      }
    }
    return select_table
  }

}
