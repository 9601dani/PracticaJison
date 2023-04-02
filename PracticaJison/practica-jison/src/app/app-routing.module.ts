import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditorTxtComponent} from "./components/editor-txt/editor-txt.component";
import {EditorConsultComponent} from "./components/editor-consult/editor-consult.component";

const routes: Routes = [
  {path:'', component: EditorTxtComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
