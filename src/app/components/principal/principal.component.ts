import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from "../../services/evento.service";
import { CauseService } from '../../services/cause.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  
  eventos:any[] = [];

  irACompra(evento: any) {
    this.router.navigate(['/compra']);
    this.causeService.setEvento(evento);
  }

  constructor(private router: Router,private causeService:CauseService) {
    causeService.getAllCauses().subscribe({
      next:(response) => {
        response['causes'].forEach((cause: any[]) => {
          this.eventos.push({nombre:cause[0], descripcion:cause[1],imagen:cause[2]})
        });
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


}
