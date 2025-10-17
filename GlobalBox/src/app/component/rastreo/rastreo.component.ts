import { Component, OnInit } from '@angular/core';
import { TrackingService, OrderTrackingInfo } from '../../../services/tracking.service';
import { IonicModule } from '@ionic/angular';
import { arrowForwardOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
addIcons({ arrowForwardOutline });


@Component({
  selector: 'app-rastreo',
  templateUrl: './rastreo.component.html',
  styleUrls: ['./rastreo.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RastreoComponent  implements OnInit {

  orderInfo: OrderTrackingInfo | null = null;

  constructor(private trackingService: TrackingService) { }

  ngOnInit() {
    this.orderInfo = this.trackingService.lastOrder;
  }

  codigo: string = '';
  estado: string = '';
  ubicacion: string = '';
  fecha: string = '';
  resultadoVisible: boolean = false;

  pedidos: any = {
    "ABC123": {
      estado: "En tránsito",
      ubicacion: "Miami, Estados Unidos",
      fecha: "28/09/2025"
    },
    "XYZ789": {
      estado: "En aduana",
      ubicacion: "Buenos Aires, Argentina",
      fecha: "02/10/2025"
    },
    "LMN456": {
      estado: "Entregado",
      ubicacion: "Córdoba, Argentina",
      fecha: "21/09/2025"
    }
  };

  rastrearPedido() {
    const pedido = this.pedidos[this.codigo.trim()];
    this.resultadoVisible = true;

    if (pedido) {
      this.estado = pedido.estado;
      this.ubicacion = pedido.ubicacion;
      this.fecha = pedido.fecha;
    } else {
      this.estado = "⚠️ Código no encontrado";
      this.ubicacion = "-";
      this.fecha = "-";
    }
  }
}
