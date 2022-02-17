import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../../models/transaction';
import { TransactionsService } from '../../services/transactions.service';
import {Location} from '@angular/common'

@Component({
  selector: 'app-create-retiro',
  templateUrl: './create-retiro.component.html',
  styleUrls: ['./create-retiro.component.css']
})
export class CreateRetiroComponent implements OnInit {

    //DEFINIMOS UNA ENTIDAD
    public transaction: Transaction= new Transaction()
    public cuentaOrigenId: number
    public clienteId: number

  constructor(private transactionService:TransactionsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location:Location) { }

  ngOnInit(): void {
    this.clienteId = this.activatedRoute.snapshot.params['clienteId']
    this.cuentaOrigenId = this.activatedRoute.snapshot.params['cuentaOrigenId'];
  }

  retirar(): void {
    this.transaction.tipoOperacion = 'retiro'
    this.transaction.tipoMovimiento = 'DEBITO'
    this.transaction.cuentaOrigen = this.cuentaOrigenId
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
}

  volver(): void {
    this.location.back();
  }

}
