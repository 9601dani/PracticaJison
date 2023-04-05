import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeEditorModule} from "@ngstack/code-editor";
import { EditorTxtComponent } from './components/editor-txt/editor-txt.component';
import { EditorConsultComponent } from './components/editor-consult/editor-consult.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorTxtComponent,
    EditorConsultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CodeEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
