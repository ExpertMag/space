import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './list/item/item.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  {
    path: ':id',
    component: ItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
