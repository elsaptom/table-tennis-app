import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TennisTableComponent } from './tennis-table/tennis-table.component';

const routes: Routes = [
  {path:'', redirectTo: '/table-tennis', pathMatch:'full'},
  {path:'table-tennis', component: TennisTableComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
