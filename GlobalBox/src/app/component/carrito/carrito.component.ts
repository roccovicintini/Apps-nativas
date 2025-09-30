

import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CarritoService, CarritoItem } from '../../services/carrito.service';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { 
  heartOutline, 
  cartOutline, 
  personOutline, 
  earthOutline, 
  cubeOutline, 
  starOutline, 
  starHalfOutline,
  menuOutline,
  laptopOutline,
  shirtOutline,
  fastFoodOutline,
  homeOutline,
  closeCircleOutline,
  trashOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class CarritoComponent implements OnDestroy {
  carrito: CarritoItem[] = [];
  sub: Subscription;

  constructor(private carritoService: CarritoService) {
    this.sub = this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get subtotalUSD(): number {
    return this.carrito.reduce((sum, item) => sum + item.precioUSD * item.cantidad, 0);
  }

  get envioUSD(): number {
    return this.carrito.length > 0 ? 10 : 0;
  }

  get totalUSD(): number {
    return this.subtotalUSD + this.envioUSD;
  }

  eliminarDelCarrito(item: CarritoItem) {
    this.carritoService.removeProducto(item.id);
  }

  cambiarCantidad(item: CarritoItem, cantidad: number) {
    if (cantidad > 0) {
      this.carritoService.updateCantidad(item.id, cantidad);
    }
  }
}
