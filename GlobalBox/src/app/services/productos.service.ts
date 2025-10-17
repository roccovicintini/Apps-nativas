import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interface que coincide con tu backend
export interface Producto {
  id_productos: number;
  nombre: string;
  precio_usd: number;
  precio_ars: number;
  imagen: string;
  id_pais: number;
  id_categoria: number;
  id_proveedor?: number;
  envio_gratis: boolean;
  descuento: number;
  flag?: string;
  reviews: number;
  stock: number;
  resena?: number;
  fecha_creacion?: string;
  activo?: boolean;
  
  // Campos adicionales para compatibilidad frontend
  isFavorite?: boolean;
  pais?: string;
  categoria?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error al cargar productos del backend:', error);
        return of(this.getProductosMock());
      })
    );
  }

  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  updateProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  private getProductosMock(): Producto[] {
    return [
      {
        id_productos: 1,
        nombre: 'Reloj Metálico',
        precio_usd: 120,
        precio_ars: 160000,
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz_iIM8YTTLy3UnehXoT3YlaGmrxF6jdbZhA&s',
        id_pais: 1,
        id_categoria: 1,
        envio_gratis: true,
        descuento: 0,
        reviews: 120,
        stock: 10,
        isFavorite: false,
        pais: 'USA',
        categoria: 'tecnologia'
      },
      {
        id_productos: 2,
        nombre: 'Zapatillas Nike',
        precio_usd: 25,
        precio_ars: 33000,
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQkIV3H9B1NnyShPfTaYU0zWQ0SKBCPnnSug&s',
        id_pais: 1,
        id_categoria: 2,
        envio_gratis: false,
        descuento: 20,
        reviews: 85,
        stock: 15,
        isFavorite: false,
        pais: 'USA',
        categoria: 'moda'
      },
      {
        id_productos: 3,
        nombre: 'Café Colombiano',
        precio_usd: 15,
        precio_ars: 20000,
        imagen: 'https://cafeeldorado.mx/cdn/shop/files/ColombiaFondoBlanco1-Photoroom.jpg?v=1750191847',
        id_pais: 5,
        id_categoria: 3,
        envio_gratis: true,
        descuento: 0,
        reviews: 200,
        stock: 50,
        isFavorite: false,
        pais: 'Col',
        categoria: 'alimentos'
      },
      {
        id_productos: 4,
        nombre: 'Camiseta de Fútbol',
        precio_usd: 90,
        precio_ars: 120000,
        imagen: 'https://shop.rfef.es/cdn/shop/products/23CM0743_Z4.jpg?v=1749205585&width=1000',
        id_pais: 3,
        id_categoria: 2,
        envio_gratis: false,
        descuento: 10,
        reviews: 95,
        stock: 20,
        isFavorite: false,
        pais: 'Esp',
        categoria: 'moda'
      },
{
      id_productos: 5,
      nombre: 'Auriculares Bluetooth',
      precio_usd: 60,
      precio_ars: 80000,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIRpKK3B4XarZ8zJ58jnt8sxxVCovUg8yCrg&s',
      id_pais: 1, 
      id_categoria: 1,
      envio_gratis: false, 
      descuento: 0, 
      reviews: 150,
      stock: 35, 
      isFavorite: false,
      pais: 'USA',
      categoria: 'tecnologia'
    },
    {
      id_productos: 6,
      nombre: 'Mochila de Viaje',
      precio_usd: 70,
      precio_ars: 95000,
      imagen: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRn5THkEZ0WHoe1I_c_2khG9rfcWHxeM3DGrW1Oor4KvBRnQmdZfCpqNAMkBBkR9BQSTgwIZ7xf6AU-fh0du5p14pV6bPfE1Ztx_PIbLNV2FIRC2Oj0sCkYdaQKbITvEMuzvADsSNE&usqp=CAc',
      id_pais: 1, 
      id_categoria: 2,
      envio_gratis: false, 
      descuento: 15,
      reviews: 90,
      stock: 25, 
      pais: 'USA',
      categoria: 'moda',
      isFavorite: false,
    },
    {
      id_productos: 7,
      nombre: 'Smartphone Goole Pixel',
      precio_usd: 500,
      precio_ars: 650000,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpMoBWbxz6GheNyIaI7MDVgD3FxZ1tEEKZzw&s',
      id_pais: 1, 
      id_categoria: 1, 
      envio_gratis: false, 
      descuento: 0, 
      reviews: 300,
      stock: 12, 
      pais: 'USA',
      categoria: 'tecnologia',  
      isFavorite: false,
    },
    {
      id_productos: 8,
      nombre: 'SmartWatch Samsung',
      precio_usd: 200,
      precio_ars: 260000, 
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZdwcqiKRLb_q5ENAneE8wXm495y5MT0635Q&s',
      id_pais: 1, 
      id_categoria: 1, 
      envio_gratis: false, 
      descuento: 5,
      reviews: 180,
      stock: 20,
      pais: 'USA',
      categoria: 'tecnologia',
      isFavorite: false,
    },
    {
      id_productos: 9,
      nombre: 'Polo Verde',
      precio_usd: 10,
      precio_ars: 12000,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTvxmH3JHtIiSsM_5aIziCJ0USLjR29p2ZYtSsnxZgTRVpozOhC2l4xCqYvfZvoB6inxI&usqp=CAU',
      id_pais: 1, 
      id_categoria: 2, // Añadido
      envio_gratis: false, // Añadido
      descuento: 0, // Añadido
      reviews: 75,
      stock: 40, // Añadido
      pais: 'USA',
      categoria: 'moda',
      isFavorite: false,
    }, 
    {
      id_productos: 10,
      nombre: 'Perfume Hugo Boss',
      precio_usd: 150,
      precio_ars: 180000, // Corregido 'precioARS' a 'precio_ars'
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGWRi0N8fYCuIe4nggkaovz3qx6ZnNGMTUtA&s',
      id_pais: 1, // Añadido
      id_categoria: 2, // Añadido
      envio_gratis: true, // Añadido
      descuento: 0, // Añadido
      reviews: 80,
      stock: 18, // Añadido
      pais: 'USA',
      categoria: 'moda',
      isFavorite: false,
    },
    {
      id_productos: 11,
      nombre: 'Tablet Samsung',
      precio_usd: 300,
      precio_ars: 390000, // Corregido 'precioARS' a 'precio_ars'
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJJ_TPkBkC1s-6KAg1_Z5JyWRuyTz3PUNu_Q&s',
      id_pais: 1, // Añadido
      id_categoria: 1, // Añadido
      envio_gratis: true, // Añadido
      descuento: 0, // Añadido
      reviews: 110,
      stock: 14, // Añadido
      pais: 'USA',
      categoria: 'tecnologia',
      isFavorite: false,
    },
    {
      id_productos: 12,
      nombre: 'Campera de Cuero',
      precio_usd: 250,
      precio_ars: 320000, // Corregido 'precioARS' a 'precio_ars'
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6VCwAfHvXoI8MYat0t2-ulErVR6mXlMCrSA&s',
      id_pais: 1, // Añadido
      id_categoria: 2, // Añadido
      envio_gratis: false, // Añadido
      descuento: 20, // Añadido
      reviews: 130,
      stock: 8, // Añadido
      pais: 'USA',
      categoria: 'moda',
      isFavorite: false,
    },
    {
      id_productos: 13,
      nombre: 'Anteojos de Sol Ray-Ban',
      precio_usd: 180,
      precio_ars: 230000, // Corregido 'precioARS' a 'precio_ars'
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGVUAHxbCizxIw7F0zaNjJRGcmSjYtYV9HSQ&s',
      id_pais: 1, // Añadido
      id_categoria: 2, // Añadido
      envio_gratis: false, // Añadido
      descuento: 0, // Añadido
      reviews: 90,
      stock: 22, // Añadido
      pais: 'USA',
      categoria: 'moda',
      isFavorite: false,
    },
    {
      id_productos: 14,
      nombre: 'Freidora de Aire',
      precio_usd: 130,
      precio_ars: 170000, // Corregido 'precioARS' a 'precio_ars'
      imagen: 'https://imagenes.elpais.com/resizer/v2/2Y5SABIBCFD7BJZOQLNYWDHAWE.png?auth=d2ce54e017e2ed522137be500c2d8361dd0dd411c1338693ceb5559264c20951&width=1960',
      id_pais: 1, // Añadido
      id_categoria: 4, // Añadido (asumiendo 4 es hogar)
      envio_gratis: true, // Añadido
      descuento: 0, // Añadido
      reviews: 140,
      stock: 16, // Añadido
      pais: 'USA',
      categoria: 'hogar',
      isFavorite: false,
    },
    {
      id_productos: 15,
      nombre: 'Batidora',
      precio_usd: 80,
      precio_ars: 100000, 
      imagen: 'https://m.media-amazon.com/images/I/61695++cy8L.jpg',
      id_pais: 1,
      id_categoria: 4, 
      envio_gratis: false,
      descuento: 0,
      reviews: 60,
      stock: 20,
      pais: 'USA',
      categoria: 'hogar',
      isFavorite: false,
  },
  {
      id_productos: 16,
      nombre: 'Lámpara Velador',
      precio_usd: 22,
      precio_ars: 28000,
      imagen: 'https://m.media-amazon.com/images/I/61bFfwhfTgL._UF894,1000_QL80_.jpg',
      id_pais: 1,
      id_categoria: 4, 
      envio_gratis: true, 
      descuento: 0, 
      reviews: 50,
      stock: 30, 
      pais: 'USA',
      categoria: 'hogar',
      isFavorite: false,
},
 {
      id_productos: 17,
      nombre: 'Mesita de Noche',
      precio_usd: 50,
      precio_ars: 65000, 
      imagen: 'https://m.media-amazon.com/images/I/61n1w+mc7QL.jpg',
      id_pais: 1,
      id_categoria: 4, 
      envio_gratis: false, 
      descuento: 10, 
      reviews: 70,
      stock: 10, 
      pais: 'USA',
      categoria: 'hogar',
      isFavorite: false,
  },
    {
      id_productos: 18,
      nombre: 'Cinturón de Cuero',
      precio_usd: 27,
      precio_ars: 34000, 
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi8E72zdwIDskVnHFXvQKXF0QplbZ-26nYCw&s',
      id_pais: 1,
      id_categoria: 2, 
      envio_gratis: true, 
      descuento: 0,
      reviews: 40,
      stock: 50, 
      categoria: 'moda',
      isFavorite: false,
    },
    {
      id_productos: 19,
      nombre: 'Laptop',
      precio_usd: 600,
      precio_ars: 780000,
      imagen: 'https://m.media-amazon.com/images/I/71s1LRpaprL._AC_SL1500_.jpg',
      id_pais: 1, 
      id_categoria: 1, 
      envio_gratis: false, 
      descuento: 10,
      reviews: 120,
      stock: 7, 
      pais: 'USA',
      categoria: 'tecnologia',
      isFavorite: false,
    },
    {
      id_productos: 20,
      nombre: 'Chocolate Suizo Blanco',
      precio_usd: 12,
      precio_ars: 15000,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxt6Qo43nJ4fNwilEURjfK7huHQFU2itzb6A&s',
      id_pais: 6, 
      id_categoria: 3, 
      envio_gratis: false, 
      descuento: 0, 
      reviews: 220,
      stock: 100,
      pais: 'Sui',
      categoria: 'alimentos',
      isFavorite: false
  }
    ];
  }
}