import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { MastersListComponent } from './components/masters-list/masters-list.component';
import { ServicesComponent } from './components/services/services.component';

const routes: Routes = [
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'contacts',
    component: ContactComponent
  },
  {
    path: 'masters',
    component: MastersListComponent
  },
  {
    path: '**',
    component: ServicesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
