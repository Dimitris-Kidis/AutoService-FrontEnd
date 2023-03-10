import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { MastersListComponent } from './components/masters-list/masters-list.component';
import { RegisterComponent } from './components/register/register.component';
import { ServicesComponent } from './components/services/services.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientHistoryComponent } from './components/client-history/client-history.component';
import { MasterHistoryComponent } from './components/master-history/master-history.component';
import { CabinetComponent } from './components/cabinet/cabinet.component';
import { RecordComponent } from './components/record/record.component';
import { ClientChatComponent } from './components/client-chat/client-chat.component';
import { MasterChatComponent } from './components/master-chat/master-chat.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ServicesComponent,
    ContactComponent,
    MastersListComponent,
    LoginComponent,
    RegisterComponent,
    ClientHistoryComponent,
    MasterHistoryComponent,
    CabinetComponent,
    RecordComponent,
    ClientChatComponent,
    MasterChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  exports: [
    MatFormFieldModule,
    MatInputModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
