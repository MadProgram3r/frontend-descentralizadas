import { CurrencyPipe } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {Router} from '@angular/router';
import { FormsModule } from "@angular/forms";
import {EventoService} from '../../services/evento.service';
import { CauseService } from '../../services/cause.service';
import { AuthService } from '../../services/auth.service';
import { DonationService } from '../../services/donation.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent {
  eventoSeleccionado: any = null;
  nombre = '';
  cantidad = "0";
  hash = "";
  isButtonDisabled = false;
  contractNFT = "";
  idToken = "";

  constructor(private router: Router, private causeService:CauseService, 
    private authService:AuthService, private donationService:DonationService,
    private toastr:ToastrService, private http:HttpClient) {}

  ngOnInit() {
    this.eventoSeleccionado = this.causeService.getEvento();

    if (!this.eventoSeleccionado) {
      this.router.navigate(['/eventos']); // Redirige si no hay evento seleccionado
    }
    this.conectarBilletera()
  }

  // Conectar MetaMask
  async conectarBilletera() {
    await this.authService.connectToMetaMask();
  }

  async realizarDonacion() {
    if (!this.cantidad) {
      alert('Por favor ingresa todos los campos');
      return;
    }
    this.toastr.info(
      "Esperando confirmación, podría tardar unos minutos", 
      undefined,
      {
        timeOut: 0,
        closeButton: false,
        tapToDismiss: false,
        extendedTimeOut: 0,
        positionClass: 'toast-top-center', // Posición del toastr
        progressBar: true,               // Mostrar barra de progreso
      }
    );
    this.isButtonDisabled = true;
      try {
      const txHash = await this.donationService.donateToCause(this.cantidad); // Realizamos la donación
      this.isButtonDisabled = false;
      this.hash = txHash;
      this.toastr.clear()
      this.toastr.success(`Hash de la transacción: ${txHash}`)
    } catch (error) {
      this.isButtonDisabled = false;
      this.toastr.clear()
      console.error(error);
      alert('Hubo un error al realizar la donación');
    }
  }

  generateNFT(){
    this.toastr.info(
      "Esperando confirmación, podría tardar unos minutos", 
      undefined,
      {
        timeOut: 0,
        closeButton: false,
        tapToDismiss: false,
        extendedTimeOut: 0,
        positionClass: 'toast-top-center', // Posición del toastr
        progressBar: true,               // Mostrar barra de progreso
      }
    );
    this.http.post<any>(`http://localhost:3000/createNFT`, 
    { "name":this.eventoSeleccionado.nombre, "description":this.eventoSeleccionado.descripcion, 
      "imageURL":this.eventoSeleccionado.imagen, "toAddress":this.authService.getUserAddress() }
    ).subscribe({
      next:(response)=>{
        this.toastr.clear()
        this.toastr.success("NFT enviado exitosamente")
        this.contractNFT = response.contractAddress;
        this.idToken = response.tokenId;
      },
      error:(err)=>{
        this.toastr.error("Algo fallo, reintentalo nuevamente")
        console.log(err)
      }
    })

  }
}
