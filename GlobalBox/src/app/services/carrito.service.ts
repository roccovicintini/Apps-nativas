import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from './productos.service';

export interface CarritoItem extends Producto {
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private carritoSubject = new BehaviorSubject<CarritoItem[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  getCarrito(): CarritoItem[] {
    return this.carritoSubject.value;
  }

  addProducto(producto: Producto) {
    const carrito = [...this.carritoSubject.value];
    const idx = carrito.findIndex(item => item.id === producto.id);
    if (idx > -1) {
      carrito[idx].cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    this.carritoSubject.next(carrito);
  }

  removeProducto(id: number) {
    const carrito = this.carritoSubject.value.filter(item => item.id !== id);
    this.carritoSubject.next(carrito);
  }

  updateCantidad(id: number, cantidad: number) {
    const carrito = this.carritoSubject.value.map(item =>
      item.id === id ? { ...item, cantidad } : item
    );
    this.carritoSubject.next(carrito);
  }

  clear() {
    this.carritoSubject.next([]);
  }
  clearCarrito() {
    this.carritoSubject.next([]);
  }
}

  