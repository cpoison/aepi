import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from 'src/app/producto.interface';


@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  @Input() productos: Producto[];
  @Input() titulo: string;
  @Output() productoSeleccionado: EventEmitter<Producto>

  constructor() {
    this.productos = [];
    this.titulo = "";
    this.productoSeleccionado = new EventEmitter();
  }

  ngOnInit(): void {

  }

  onClick(producto: Producto) {
    console.log(producto)
    this.productoSeleccionado.emit(producto);
  }

}
