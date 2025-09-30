import { Injectable } from '@angular/core';

export interface Producto {
  id: number;
  nombre: string;
  precioUSD: number;
  precioARS: number;
  imagen: string;
  pais: string;
  categoria: string;
  isFavorite?: boolean;
  reviews?: number;
  flag?: string;
  envioGratis?: boolean;
  descuento?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productos: Producto[] = [
    {
      id: 1,
      nombre: 'Reloj Metálico',
      precioUSD: 120,
      precioARS: 160000,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz_iIM8YTTLy3UnehXoT3YlaGmrxF6jdbZhA&s',
      pais: 'USA',
      categoria: 'tecnologia',
      isFavorite: false,
      reviews: 120
    },
    {
      id: 2,
      nombre: 'Zapatillas Nike',
      precioUSD: 25,
      precioARS: 33000,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQkIV3H9B1NnyShPfTaYU0zWQ0SKBCPnnSug&s',
      pais: 'USA',
      categoria: 'moda',
      isFavorite: false,
      reviews: 85
    },
    {
      id: 3,
      nombre: 'Café Colombiano',
      precioUSD: 15,
      precioARS: 20000,
      imagen: 'https://cafeeldorado.mx/cdn/shop/files/ColombiaFondoBlanco1-Photoroom.jpg?v=1750191847',
      pais: 'Col',
      categoria: 'alimentos',
      isFavorite: false,
      reviews: 200
    },
    {
      id: 4,
      nombre: 'Camiseta de Fútbol',
      precioUSD: 90,
      precioARS: 120000,
      imagen: 'https://shop.rfef.es/cdn/shop/products/23CM0743_Z4.jpg?v=1749205585&width=1000',
      pais: 'Esp',
      categoria: 'moda',
      isFavorite: false,
      reviews: 95
    },
    {
      id: 5,
      nombre: 'Auriculares Bluetooth',
      precioUSD: 60,
      precioARS: 80000,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIRpKK3B4XarZ8zJ58jnt8sxxVCovUg8yCrg&s',
      pais: 'USA',
      categoria: 'tecnologia',
      isFavorite: false,
      reviews: 150
    },
    {
      id: 6,
      nombre: 'Mochila de Viaje',
      precioUSD: 70,
      precioARS: 95000,
      imagen: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRn5THkEZ0WHoe1I_c_2khG9rfcWHxeM3DGrW1Oor4KvBRnQmdZfCpqNAMkBBkR9BQSTgwIZ7xf6AU-fh0du5p14pV6bPfE1Ztx_PIbLNV2FIRC2Oj0sCkYdaQKbITvEMuzvADsSNE&usqp=CAc',
      pais: 'USA',
      categoria: 'moda',
    },
    {
      id: 7,
      nombre: 'Smartphone Goole Pixel',
      precioUSD: 500,
      precioARS: 650000,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpMoBWbxz6GheNyIaI7MDVgD3FxZ1tEEKZzw&s',
      pais: 'USA',
      categoria: 'tecnologia',  
      isFavorite: false,
      reviews: 300
    },
    {
      id: 8,
      nombre: 'SmartWatch Samsung',
      precioUSD: 200,
      precioARS: 260000,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZdwcqiKRLb_q5ENAneE8wXm495y5MT0635Q&s',
      pais: 'USA',
      categoria: 'tecnologia',
      isFavorite: false,
      reviews: 180
    },
    {
      id: 9,
      nombre: 'Polo Verde',
      precioUSD: 10,
      precioARS: 12000,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTvxmH3JHtIiSsM_5aIziCJ0USLjR29p2ZYtSsnxZgTRVpozOhC2l4xCqYvfZvoB6inxI&usqp=CAU',
      pais: 'USA',
      categoria: 'moda',
      isFavorite: false,
      reviews: 75
    }, 
    {
      id: 10,
      nombre: 'Perfume Hugo Boss',
      precioUSD: 150,
      precioARS: 180000,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGWRi0N8fYCuIe4nggkaovz3qx6ZnNGMTUtA&s',
      pais: 'USA',
      categoria: 'moda',
      isFavorite: false,
      reviews: 80
    },
    {
      id: 11,
      nombre: 'Tablet Samsung',
      precioUSD: 300,
      precioARS: 390000,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJJ_TPkBkC1s-6KAg1_Z5JyWRuyTz3PUNu_Q&s',
      pais: 'USA',
      categoria: 'tecnologia',
      isFavorite: false,
      reviews: 110
    },
    {
      id: 12,
      nombre: 'Campera de Cuero',
      precioUSD: 250,
      precioARS: 320000,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6VCwAfHvXoI8MYat0t2-ulErVR6mXlMCrSA&s',
      pais: 'USA',
      categoria: 'moda',
      isFavorite: false,
      reviews: 130
    },
    {
      id: 13,
      nombre: 'Anteojos de Sol Ray-Ban',
      precioUSD: 180,
      precioARS: 230000,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGVUAHxbCizxIw7F0zaNjJRGcmSjYtYV9HSQ&s',
      pais: 'USA',
      categoria: 'moda',
      isFavorite: false,
      reviews: 90
    },
    {
      id: 14,
      nombre: 'Freidora de Aire',
      precioUSD: 130,
      precioARS: 170000,
      imagen: 'https://imagenes.elpais.com/resizer/v2/2Y5SABIBCFD7BJZOQLNYWDHAWE.png?auth=d2ce54e017e2ed522137be500c2d8361dd0dd411c1338693ceb5559264c20951&width=1960',
      pais: 'USA',
      categoria: 'hogar',
      isFavorite: false,
      reviews: 140
    },
    {
      id: 15,
      nombre: 'Batidora',
      precioUSD: 80,
      precioARS: 100000,
      imagen: 'https://m.media-amazon.com/images/I/61695++cy8L.jpg',
      pais: 'USA',
      categoria: 'hogar',
      isFavorite: false,
      reviews: 60
    },
    {
      id: 16,
      nombre: 'Lámpara Velador',
      precioUSD: 22,
      precioARS: 28000,
      imagen: 'https://m.media-amazon.com/images/I/61bFfwhfTgL._UF894,1000_QL80_.jpg',
      pais: 'USA',
      categoria: 'hogar',
      isFavorite: false,
      reviews: 50
    },
    {
      id: 17,
      nombre: 'Mesita de Noche',
      precioUSD: 50,
      precioARS: 65000,
      imagen: 'https://m.media-amazon.com/images/I/61n1w+mc7QL.jpg',
      pais: 'USA',
      categoria: 'hogar',
      isFavorite: false,
      reviews: 70
    },
    {
      id: 18,
      nombre: 'Cinturón de Cuero',
      precioUSD: 27,
      precioARS: 34000,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi8E72zdwIDskVnHFXvQKXF0QplbZ-26nYCw&s',
      pais: 'USA',
      categoria: 'moda',
      isFavorite: false,
      reviews: 40
    },
    {
      id: 19,
      nombre: 'Laptop',
      precioUSD: 600,
      precioARS: 780000,
      imagen: 'https://m.media-amazon.com/images/I/71s1LRpaprL._AC_SL1500_.jpg',
      pais: 'USA',
      categoria: 'tecnologia',
      isFavorite: false,
      reviews: 120,
    },
    {
      id: 20,
      nombre: 'Chocolate Suizo Blanco',
      precioUSD: 12,
      precioARS: 15000,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxt6Qo43nJ4fNwilEURjfK7huHQFU2itzb6A&s',
      pais: 'Sui',
      categoria: 'alimentos',
      isFavorite: false,
      reviews: 220
    }
  ];

  constructor() { }

  getProductos(): Producto[] {
    return this.productos;
  }
}
