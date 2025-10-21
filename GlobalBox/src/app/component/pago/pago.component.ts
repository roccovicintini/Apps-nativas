import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackingService } from '../../../services/tracking.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class PagoComponent  implements OnInit, OnDestroy {
  cartItems: any[] = [];
  cartTotal: number = 0;
  private carritoSub?: Subscription;

  selectedPaymentMethod: string | null = null;

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private trackingService: TrackingService
  ) { }

  ngOnInit() {
    this.carritoSub = this.carritoService.carrito$.subscribe(items => {
      this.cartItems = Array.isArray(items) ? items : [];
      this.cartTotal = this.cartItems.reduce((sum, item) => {
        const qty = Number(item?.cantidad) || 0;
        const price = Number((item as any)?.precio_usd ?? (item as any)?.precioUSD ?? (item as any)?.precio ?? (item as any)?.price) || 0;
        return sum + price * qty;
      }, 0);
    });
  }

  ngOnDestroy() {
    if (this.carritoSub) this.carritoSub.unsubscribe();
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  onPay() {
    if (!this.selectedPaymentMethod) return;
    this.trackingService.saveOrder(this.selectedPaymentMethod, this.cartItems, this.cartTotal);
    this.carritoService.clearCarrito();
    this.router.navigate(['/home']);
  }
}
