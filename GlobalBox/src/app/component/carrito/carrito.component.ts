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
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class CarritoComponent implements OnDestroy {
  carrito: CarritoItem[] = [];
  sub: Subscription;

  constructor(private carritoService: CarritoService, public router: Router) {
    addIcons({
      closeCircleOutline,
      trashOutline
    });
    
    this.sub = this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get subtotalUSD(): number {
    return this.carrito.reduce((sum, item) => {
      // prefer backend field `precio_usd`, but accept legacy/alternate names safely
      const precio = Number((item as any)['precio_usd'] ?? (item as any)['precioUSD'] ?? (item as any)['precio'] ?? (item as any)['price']) || 0;
      const qty = Number(item.cantidad) || 0;
      return sum + precio * qty;
    }, 0);
  }

  get envioUSD(): number {
    return this.carrito.length > 0 ? 10 : 0;
  }

  get totalUSD(): number {
    return this.subtotalUSD + this.envioUSD;
  }

  eliminarDelCarrito(item: CarritoItem) {
    const itemId = Number((item as any)['id_productos'] ?? (item as any)['id']);
    if (itemId) {
      this.carritoService.removeProducto(itemId);
    }
  }

  cambiarCantidad(item: CarritoItem, cantidad: number) {
    if (cantidad > 0) {
      const itemId = Number((item as any)['id_productos'] ?? (item as any)['id']);
      if (itemId) {
        this.carritoService.updateCantidad(itemId, cantidad);
      }
    }
  }
}