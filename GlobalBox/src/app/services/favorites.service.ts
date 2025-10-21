import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from './productos.service';

const STORAGE_KEY = 'gb_favorites_v1';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private _favorites = new BehaviorSubject<Producto[]>(this.load());
  readonly favorites$ = this._favorites.asObservable();

  private load(): Producto[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private persist(list: Producto[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {}
  }

  get favorites(): Producto[] {
    return this._favorites.value;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(p => (p.id_productos ?? (p as any).id) === id);
  }

  add(producto: Producto) {
    const id = producto.id_productos ?? (producto as any).id;
    if (id == null || this.isFavorite(id)) return;
    const list = [...this.favorites, { ...producto, isFavorite: true }];
    this._favorites.next(list);
    this.persist(list);
  }

  remove(id: number) {
    const list = this.favorites.filter(p => (p.id_productos ?? (p as any).id) !== id);
    this._favorites.next(list);
    this.persist(list);
  }

  toggle(producto: Producto) {
    const id = producto.id_productos ?? (producto as any).id;
    if (id == null) return;
    if (this.isFavorite(id)) {
      this.remove(id);
    } else {
      this.add(producto);
    }
  }
}