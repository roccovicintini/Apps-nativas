import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class PagoComponent  implements OnInit {
  cartItems: any[] = [];
  cartTotal: number = 0;

  constructor(private carritoService: CarritoService, private router: Router) { }

  ngOnInit() {
    this.carritoService.carrito$.subscribe(items => {
      this.cartItems = items;
      this.cartTotal = items.reduce((sum, item) => sum + (item.precioUSD * (item.cantidad || 0)), 0);
    });
  }

  onPay() {
    // Simulación de pago exitoso
    alert('Pago realizado con éxito!');
    this.carritoService.clearCarrito();
    this.router.navigate(['/home']);
  }
}
