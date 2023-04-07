import { Component } from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {MiniSql} from "../../parser/parserSql/MiniSql";
import {MyErrors} from "../../ManageError/MyErrors";
import {MyErrorsMini} from "../../ManageError/MyErrorsMini";
import {TablaSimbolos} from "../../models/tabla_simbolos";
declare var minisql: any;

@Component({
  selector: 'app-editor-consult',
  templateUrl: './editor-consult.component.html',
  styleUrls: ['./editor-consult.component.css']
})
export class EditorConsultComponent {
  table_simbolos:TablaSimbolos|undefined

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
      const par = new MiniSql(this.codeModel.value);
      this.table_simbolos = par.parse();
      if(this.table_simbolos){
        console.log(this.table_simbolos)
        console.log(`hice todo bien`)
      }


  }

  protected readonly MyErrors = MyErrors;
  protected readonly MyErrorsMini = MyErrorsMini;
}
