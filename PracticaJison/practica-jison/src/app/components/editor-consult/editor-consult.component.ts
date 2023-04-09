import { Component } from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {MiniSql} from "../../parser/parserSql/MiniSql";
import {MyErrors} from "../../ManageError/MyErrors";
import {MyErrorsMini} from "../../ManageError/MyErrorsMini";
import {TablaSimbolos} from "../../models/tabla_simbolos";
import {DefManageError} from "../../ManageError/DefManageError";
declare var minisql: any;

@Component({
  selector: 'app-editor-consult',
  templateUrl: './editor-consult.component.html',
  styleUrls: ['./editor-consult.component.css']
})
export class EditorConsultComponent {
  codigo: string = '';
  columna!:number;
  linea!:number;
  table_simbolos:TablaSimbolos|undefined
  myNodes:Node[]=[];
  theme = 'vs-dark';
  result = '';

  codeModel: CodeModel = {
    language: 'sql',
    uri: 'sql',
    value: ''
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    },
    fontsize: 20
  };

  onCompile(){
    try {
      const par = new MiniSql(this.codeModel.value);
      this.table_simbolos = par.parse();
      if(this.table_simbolos){
        console.log(this.table_simbolos)
        this.myNodes=this.convertToTree(JSON.stringify(this.table_simbolos))
        console.log(`hice todo bien`)
      }
    }catch (err){
      MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.linea,this.columna,"Error Inesperado","Al parecer no estas ingresando ningun texto valido"));
    }



  }
  convertToTree(json: any): Node[] {
    return Object.keys(json).map((key: string) => {
      const node: Node = {
        name: key
      };
      if (typeof json[key] === 'object') {
        node.children = this.convertToTree(json[key]);
      }
      return node;
    });
  }
  onCodeChanged(value:any) {
    this.codigo=value
    this.obtenerPosicion(this.codigo);
  }
  obtenerPosicion(codigo: string) {
    // separar el código por líneas
    this.linea= codigo.split('\n').length;
    const lineas= codigo.split('\n');
    this.columna= lineas[this.linea-1].length
  }



  protected readonly MyErrors = MyErrors;
  protected readonly MyErrorsMini = MyErrorsMini;
}
interface Node {
  name: string;
  children?: Node[];
}
