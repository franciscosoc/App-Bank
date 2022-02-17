import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account';
import { AccountsService } from '../../services/accounts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: ['./list-accounts.component.css']
})
export class ListAccountsComponent implements OnInit {

  clienteId: number;
  accounts: Account []=[];

  constructor(private serviceAccounts: AccountsService,
    private activatedRoute: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {

    this.clienteId = this.activatedRoute.snapshot.params['clienteId'];
    this.listarCuentas(this.clienteId);




  }

  listarCuentas( clienteId: number ): void {
    console.log("prueba" + clienteId)
   this.serviceAccounts.listar(clienteId).subscribe(

    resp => {

      this.accounts = resp;

    },

    er => {

      alert(er.error)



    }


   )




  }
}
