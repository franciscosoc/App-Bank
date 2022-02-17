import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListcustomersComponent } from './customers/components/listcustomers/listcustomers.component';
import { ListAccountsComponent } from './accounts/components/list-accounts/list-accounts.component';
import { CreateAccountsComponent } from './accounts/components/create-accounts/create-accounts.component';
import { ListTransactionsComponent } from './accounts/transactions/components/list-transactions/list-transactions.component';
import { CreateConsignComponent } from './accounts/transactions/components/create-consign/create-consign.component';
import { CreateRetiroComponent } from './accounts/transactions/components/create-retiro/create-retiro.component';
import { CreateTransferComponent } from './accounts/transactions/components/create-transfer/create-transfer.component';


const routes: Routes = [{path:'',component: ListcustomersComponent},

{path:'listCuentas/:clienteId', component: ListAccountsComponent },

{path:'createCuentas/:clienteId', component: CreateAccountsComponent },

{path:'listCuentas/:clienteId/listTransactions/:cuentaOrigenId', component: ListTransactionsComponent },

{path:'listCuentas/:clienteId/listTransactions/:cuentaOrigenId/consignar', component: CreateConsignComponent },

{path:'listCuentas/:clienteId/listTransactions/:cuentaOrigenId/retirar', component: CreateRetiroComponent },

{path:'listCuentas/:clienteId/listTransactions/:cuentaOrigenId/transferir', component: CreateTransferComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
