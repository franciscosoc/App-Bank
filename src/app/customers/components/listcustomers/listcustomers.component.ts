import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer'; //IMPORTAMOS EL //MODELO
import { CustomerService } from '../../service/customer.service';
import { ModalService } from '../detalle/modal.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-listcustomers',
  templateUrl: './listcustomers.component.html'

})

export class ListcustomersComponent implements OnInit {

  //ATRIBUTO DEL TIPO CUSTOMER
  customers:Customer[]=[];
  clienteSeleccionado:Customer;

  constructor(private customerService:CustomerService,public modalService:ModalService) { }

  ngOnInit() {//cuando se inicia el componente


      this.customerService.getCustomers().subscribe(dataBE=>{

          this.customers = dataBE;
          console.log(dataBE);

      });

      this.modalService.notificarUpload.subscribe(customer => {

        this.customers = this.customers.map(customerOriginal=>{

          if(customer.id == customerOriginal.id) {

            customerOriginal.foto = customer.foto;

          }

          return customerOriginal

        })

      });




    }



    delete(customer: Customer): void {

    swal.fire({

      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${customer.nombres} ${customer.apellidos}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    } as any).then((result) => {
      if (result.value) {

        this.customerService.delete(customer.id).subscribe(
          response => {
            this.customers = this.customers.filter(cli => cli !== customer)
            swal.fire(
              'Cliente Eliminado!',
              `Cliente ${customer.nombres} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }


abrirModal(customer: Customer){

  this.clienteSeleccionado = customer;
  this.modalService.abrirModal();

}

}



