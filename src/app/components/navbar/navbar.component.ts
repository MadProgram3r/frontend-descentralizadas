import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router:Router, private authService:AuthService){}

  navEventos(){
    this.router.navigate(['/eventos'])
  }

  navLogin(){
    this.router.navigate(['/login'])
  }

  navMisCompras(){
    this.router.navigate(['/mis-compras'])
  }

  isAuth(){
    return this.authService.isAuthenticated()
  }

  logOut(){
    this.authService.logOut()
  }
}
