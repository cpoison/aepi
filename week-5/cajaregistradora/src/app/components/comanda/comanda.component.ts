import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/producto.interface';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.css']
})
export class ComandaComponent implements OnInit {

  @Input() productos: Producto[];
  total: number;

  constructor() {
    this.productos = [];
    this.total = 0;
  }

  ngOnInit(): void {
  }

  sumaPrecios(total, current) {
    return total + current
  }

  onClick() {
    if (this.productos.length > 0) {
      this.total = this.productos
        .map(prod => prod.precio)
        .reduce(this.sumaPrecios);
    }
  }

}
