import { Component, OnInit,Input } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../service/customer.service';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';




@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() customer: Customer;

  public titulo:string = "Detalle del cliente"

  public fotoSeleccionada: File;
  progreso:number=0;

  constructor(private customerService: CustomerService,
    public modalService:ModalService) { }

  ngOnInit(): void {



  }

    seleccionarFoto(event){


      this.fotoSeleccionada = event.target.files[0];
      this.progreso = 0;

      console.log(this.fotoSeleccionada);

      if (this.fotoSeleccionada.type.indexOf('image') < 0) {
        swal.fire('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
        this.fotoSeleccionada = null;
      }


    }


    subirFoto() {

      if (!this.fotoSeleccionada) {
        swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
      } else {
        this.customerService.subirFoto(this.fotoSeleccionada, this.customer.id)
          .subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progreso = Math.round((event.loaded / event.total) * 100);
            } else if (event.type === HttpEventType.Response) {
              let response: any = event.body;
              this.customer = response.cliente as Customer;

              this.modalService.notificarUpload.emit(this.customer);

              swal.fire('La foto se ha subido completamente!', response.mensaje, 'success');
            }
          });
      }
    }

    cerrarModal() {
      this.modalService.cerrarModal();
      this.fotoSeleccionada = null;
      this.progreso = 0;
    }

  }

