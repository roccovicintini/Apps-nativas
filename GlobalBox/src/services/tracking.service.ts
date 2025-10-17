import { Injectable } from '@angular/core';

export interface OrderTrackingInfo {
  status: string;
  orderDate: string;
  estimatedDate: string;
  trackingId: string;
}

@Injectable({ providedIn: 'root' })
export class TrackingService {
  public lastOrder: OrderTrackingInfo | null = null;

  saveOrder(method: string) {
    this.lastOrder = {
      status: 'En preparación',
      orderDate: new Date().toLocaleString(),
      estimatedDate: '2 Días',
      trackingId: 'COMPRA-' + Date.now()
    };
  }
}
