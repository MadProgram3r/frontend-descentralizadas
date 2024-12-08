import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FormsModule } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  firstName: string = '';    // Primer nombre
  lastName: string = '';     // Apellido
  errorMessage: string = '';  // Para mostrar posibles errores
  successMessage: string = '';  // Para mostrar el mensaje de éxito

  constructor(private authService: AuthService, private router: Router, private toastr:ToastrService) {}

  // Método para manejar el envío del formulario de registro
  onRegister() {
    // Primero obtenemos la dirección de MetaMask

    if (this.lastName.trim() == "" && this.firstName.trim() == "") {
      this.toastr.error("Ingresa tus datos")
      return;
    }
    this.authService.connectToMetaMask().then(userAddress => {
      // Ahora, con la dirección de MetaMask, realizamos el registro
      this.authService.register(this.firstName, this.lastName, userAddress).subscribe(
        (response) => {
          this.toastr.success("Usuario registrado correctamente")
          localStorage.setItem('address',userAddress)
          this.router.navigate(['/eventos']);  // Redirigir al usuario a la página de eventos
        },
        (error) => {
          this.toastr.error("Error al registrar al usuario")
        }
      );
    }).catch(error => {
      this.toastr.error("Error al registrar al usuario")
    });
  }
}
