// GlobalBox/src/services/tracking.service.ts
import { Injectable } from '@angular/core';

export interface OrderTrackingInfo {
  status: string;
  orderDate: string;
  estimatedDate: string;
  trackingId: string;
  paymentMethod?: string;
  total?: number;
  items?: Array<{
    nombre: string;
    cantidad: number;
    precio: number;
  }>;
}

@Injectable({ providedIn: 'root' })
export class TrackingService {
  public lastOrder: OrderTrackingInfo | null = null;
  private LS_KEY = 'gb_last_order';

  constructor() {
    try {
      const raw = localStorage.getItem(this.LS_KEY);
      this.lastOrder = raw ? (JSON.parse(raw) as OrderTrackingInfo) : null;
    } catch {
      this.lastOrder = null;
    }
  }

  saveOrder(method: string, items: any[] = [], total: number = 0) {
    const mapped = Array.isArray(items)
      ? items.map((it: any) => ({
          nombre: String(it?.nombre ?? it?.name ?? 'Producto'),
          cantidad: Number(it?.cantidad ?? it?.qty ?? 1) || 1,
          precio: Number(it?.precio_usd ?? it?.precioUSD ?? it?.precio ?? it?.price ?? 0) || 0,
        }))
      : [];

    this.lastOrder = {
      status: 'En preparación',
      orderDate: new Date().toLocaleString(),
      estimatedDate: '2 Días',
      trackingId: 'COMPRA-' + Date.now(),
      paymentMethod: method,
      total: Number(total) || 0,
      items: mapped,
    };
    try {
      localStorage.setItem(this.LS_KEY, JSON.stringify(this.lastOrder));
    } catch {}
  }
}
