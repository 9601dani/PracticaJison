import { Component } from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
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
      const value =minisql.parse(this.codeModel.value);
      this.result = `El resultado es: ${value}`;
      console.log(`hice todo bien`)
    } catch(error) {
      console.error(error);
      this.result = 'Algo salio mal :(';
    }
  }
}
