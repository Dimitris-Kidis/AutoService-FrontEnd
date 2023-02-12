import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './components/cabinet/cabinet.component';
import { ClientChatComponent } from './components/client-chat/client-chat.component';
import { ClientHistoryComponent } from './components/client-history/client-history.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { MasterChatComponent } from './components/master-chat/master-chat.component';
import { MasterHistoryComponent } from './components/master-history/master-history.component';
import { MastersListComponent } from './components/masters-list/masters-list.component';
import { RecordComponent } from './components/record/record.component';
import { RegisterComponent } from './components/register/register.component';
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
    path: 'master-history',
    component: MasterHistoryComponent
  },
  {
    path: 'client-history',
    component: ClientHistoryComponent
  },
  {
    path: 'cabinet',
    component: CabinetComponent
  },
  {
    path: 'client-chat',
    component: ClientChatComponent
  },
  {
    path: 'master-chat',
    component: MasterChatComponent
  },
  {
    path: 'record',
    component: RecordComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
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
