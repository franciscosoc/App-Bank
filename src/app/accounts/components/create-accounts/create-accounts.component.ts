import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../models/account';
import { AccountsService } from '../../services/accounts.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-create-accounts',
  templateUrl: './create-accounts.component.html',
  styleUrls: ['./create-accounts.component.css']
})
export class CreateAccountsComponent implements OnInit {

  public account: Account= new Account()
  clienteId: number;

  constructor(private serviceAccounts: AccountsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.clienteId = this.activatedRoute.snapshot.params['clienteId'];

  }


  public create():void{

      this.account.cliente = this.clienteId;
      console.log(  this.account);
    this.serviceAccounts.crearCuenta(this.account).subscribe(

        customer => {

        this.router.navigate(['/listCuentas/', this.clienteId])

        swal.fire('Cuenta guardada', `Cuenta guardada con exito`, 'success')



      }
      );
  }


}



