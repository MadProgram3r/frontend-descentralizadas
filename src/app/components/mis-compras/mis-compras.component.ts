import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mis-compras',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './mis-compras.component.html',
  styleUrl: './mis-compras.component.css'
})
export class MisComprasComponent {
  compras: any[] = [];

  constructor() {}

  ngOnInit(): void {
    // Simulación de datos de compras
    this.compras = [
      {
        evento: 'Concierto Rock',
        cantidad: 2,
        total: 300,
        fecha: new Date('2024-11-20'),
      },
      {
        evento: 'Teatro Clásico',
        cantidad: 1,
        total: 80,
        fecha: new Date('2024-12-01'),
      },
    ];
  }

}
