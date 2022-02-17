import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../../models/transaction';
import { TransactionsService } from '../../services/transactions.service';
import {Location} from '@angular/common'
import { AccountsService } from '../../../services/accounts.service';
import { Account } from '../../../models/account';

@Component({
  selector: 'app-create-transfer',
  templateUrl: './create-transfer.component.html',
  styleUrls: ['./create-transfer.component.css']
})
export class CreateTransferComponent implements OnInit {

  //DEFINIMOS UNA ENTIDAD
  public transaction: Transaction= new Transaction()
  public accounts: Account [] = [];
  public cuentaOrigenId: number
  public clienteId: number

  constructor(private transactionService:TransactionsService,
    private accountsService: AccountsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location:Location) { }

  ngOnInit(): void {
    this.clienteId = this.activatedRoute.snapshot.params['clienteId']
    this.cuentaOrigenId = this.activatedRoute.snapshot.params['cuentaOrigenId'];
    this.listarCuentaDiffenrent();
  }

  listarCuentaDiffenrent() {
    this.accountsService.listarDifferentIdCliente(this.cuentaOrigenId).subscribe(
      resp => {
        this.accounts = resp;
      },
      err=>{
        alert("No se pudo listar, contacte al administrador");
      }
    )

  }

  transferir(): void {
    if((typeof this.transaction.cuentaDestino !== "undefined")
    && this.transaction.importe != null
    && !(this.transaction.importe <= 0)

    ){
      this.transaction.tipoOperacion = 'transferencia'
      this.transaction.tipoMovimiento = 'DEBITO'
      this.transaction.cuentaOrigen = this.cuentaOrigenId
      alert(this.transaction.cuentaDestino)
      this.transactionService.crearTransaccion(this.transaction).subscribe(
        resp => {
         // this.transaction = resp;
         this.transaction = resp;
         if (this.transaction.id != null){
          this.router.navigate([ '/listCuentas/' + this.clienteId + '/listTransactions/' + this.cuentaOrigenId + '' , ]);
         }else{
           alert("Transacción declinada, revise saldo")
         }

        },
          error => {
            alert(error.error());
          }
      )
    }else{
      alert("Ingrese una opción valida")
    }

}

  volver(): void {
    this.location.back();
  }

}

