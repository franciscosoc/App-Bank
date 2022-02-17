import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListcustomersComponent } from './customers/components/listcustomers/listcustomers.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './customers/components/form/form.component';
import { DetalleComponent } from './customers/components/detalle/detalle.component';
import { HeaderComponent } from './core/header/header.component';
import { ListAccountsComponent } from './accounts/components/list-accounts/list-accounts.component';
import { CreateAccountsComponent } from './accounts/components/create-accounts/create-accounts.component';
import { CreateConsignComponent } from './accounts/transactions/components/create-consign/create-consign.component';
import { CreateRetiroComponent } from './accounts/transactions/components/create-retiro/create-retiro.component';
import { CreateTransferComponent } from './accounts/transactions/components/create-transfer/create-transfer.component';
import { ListTransactionsComponent } from './accounts/transactions/components/list-transactions/list-transactions.component';







const routesApp:Routes=[


{path: 'customers/form', component:FormComponent},
{path: 'customers/form', component:FormComponent},
{path: 'customers/form/:id', component:FormComponent},



];

@NgModule({
  declarations: [
    AppComponent,
    ListcustomersComponent,
    FormComponent,
    DetalleComponent,
    HeaderComponent,
    ListAccountsComponent,
    CreateAccountsComponent,
    CreateConsignComponent,
    CreateRetiroComponent,
    CreateTransferComponent,
    ListTransactionsComponent,






  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routesApp),
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
