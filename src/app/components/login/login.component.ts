import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { ToastrService, provideToastr } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userAddress: string = '';  // Dirección del usuario (probablemente una dirección de billetera)
  errorMessage: string = '';  // Para mostrar posibles errores

  constructor(private authService: AuthService, private router:Router, private toastr:ToastrService) {}

  // Método para manejar el inicio de sesión
  onLogin() {
    // Llamar al servicio de conectar a MetaMask y obtener la dirección
    this.authService.connectToMetaMask().then(userAddress => {
      // Si la dirección se obtiene correctamente, intentar hacer login
      this.authService.login(userAddress).subscribe(
        (response) => {
          localStorage.setItem('address',userAddress)
          this.toastr.success('Sesión iniciada correctamente');
          this.router.navigate(['/eventos']);  // Redirigir al usuario a la página de eventos
        },
        (error) => {
          this.toastr.error('La dirección no está registrada. Por favor, regístrate.');
        }
      );
    }).catch(error => {
      this.toastr.error('Un error catastrofico')
    });
  }

  // Método para redirigir al formulario de registro
  navRegistro() {
    this.router.navigate(['/registro']);
  }
}
