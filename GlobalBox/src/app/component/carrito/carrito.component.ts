// componente del carrito: gestiona la lista de ítems y totales
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
  // estado local del carrito y suscripción al stream
  carrito: CarritoItem[] = [];
  sub: Subscription;

  constructor(private carritoService: CarritoService, public router: Router) {
    // registrar iconos usados en la plantilla
    addIcons({
      closeCircleOutline,
      trashOutline
    });
    
    // suscribirse a los cambios del carrito
    this.sub = this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
    });
  }

  ngOnDestroy() {
    // liberar la suscripción al destruir el componente
    this.sub.unsubscribe();
  }

  get subtotalUSD(): number {
    // calcula el subtotal en usd teniendo en cuenta cantidad y distintos nombres de campo de precio
    return this.carrito.reduce((sum, item) => {
      
      const precio = Number((item as any)['precio_usd'] ?? (item as any)['precioUSD'] ?? (item as any)['precio'] ?? (item as any)['price']) || 0;
      const qty = Number(item.cantidad) || 0;
      return sum + precio * qty;
    }, 0);
  }

  get envioUSD(): number {
    // costo de envío fijo si hay al menos un ítem
    return this.carrito.length > 0 ? 10 : 0;
  }

  get totalUSD(): number {
    // total a pagar en usd
    return this.subtotalUSD + this.envioUSD;
  }

  eliminarDelCarrito(item: CarritoItem) {
    // elimina un producto del carrito a partir de su id (compatibilidad con distintos nombres de campo)
    const itemId = Number((item as any)['id_productos'] ?? (item as any)['id']);
    if (itemId) {
      this.carritoService.removeProducto(itemId);
    }
  }

  cambiarCantidad(item: CarritoItem, cantidad: number) {
    // cambia la cantidad de un producto si el valor es válido
    if (cantidad > 0) {
      const itemId = Number((item as any)['id_productos'] ?? (item as any)['id']);
      if (itemId) {
        this.carritoService.updateCantidad(itemId, cantidad);
      }
    }
  }
}