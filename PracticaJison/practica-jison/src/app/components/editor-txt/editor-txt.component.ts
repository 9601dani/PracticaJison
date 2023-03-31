import { Component } from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
declare var def_bd: any;
@Component({
  selector: 'app-editor-txt',
  templateUrl: './editor-txt.component.html',
  styleUrls: ['./editor-txt.component.css']
})
export class EditorTxtComponent {
  theme = 'vs-dark';
  result = '';

  codeModel: CodeModel = {
    language: 'javascript',
    uri: 'main.js',
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
      const value =def_bd.parse(this.codeModel.value);
      this.result = `El resultado es: ${value}`;
      console.log(`hice todo bien`)
    } catch(error) {
      console.error(error);
      this.result = 'Algo salio mal :(';
    }
  }
}
