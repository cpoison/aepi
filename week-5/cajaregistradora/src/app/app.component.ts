import { Component } from '@angular/core';
import { Producto } from './producto.interface';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  arrComida: Producto[]
  arrBebida: Producto[];
  productosSeleccionados: Producto[];

  constructor() {
    this.arrComida = [
      { nombre: "Tortilla", precio: 6 },
      { nombre: "Ensalada rusa", precio: 3 },
      { nombre: "Cocido madrileño", precio: 10 },
      { nombre: "Paella", precio: 12 },
      { nombre: "Spaguetti Carbonara", precio: 5 },
      { nombre: "Pizza", precio: 4 },
    ];
    this.arrBebida = [
      { nombre: "Cocacola", precio: 2 },
      { nombre: "7up", precio: 2 },
      { nombre: "Fanta Naranja", precio: 2 },
      { nombre: "Fanta Limón", precio: 2 },
      { nombre: "Vino Tinto", precio: 5 },
      { nombre: "Vino Blanco", precio: 5 },
      { nombre: "Agua", precio: 1 },
    ];

    this.productosSeleccionados = []
  }
  onProductoSeleccionado(producto: Producto) {
    this.productosSeleccionados.push(producto);
  }
}
