import { Component } from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {MiniSql} from "../../parser/parserSql/MiniSql";
declare var minisql: any;
@Component({
  selector: 'app-editor-consult',
  templateUrl: './editor-consult.component.html',
  styleUrls: ['./editor-consult.component.css']
})
export class EditorConsultComponent {
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
      par.parse();
      console.log(`hice todo bien`)
    } catch(error) {
      console.error(error);
      this.result = 'Algo salio mal :(';
    }
  }
}
