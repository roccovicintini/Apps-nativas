
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProductosService, Producto } from '../../services/productos.service';
import { CarritoService } from '../../services/carrito.service';
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
  closeCircleOutline
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { IonBadge } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class HomeComponent {
  productos: Producto[] = [
    {
  id: 1,
  nombre: 'Reloj',
      imagen: 'https://m.media-amazon.com/images/I/71TPda7cwUL._AC_SL1500_.jpg',
      pais: 'EE.UU.',
      flag: 'us',
      precioUSD: 120,
  precioARS: 160000,
  categoria: 'tecnologia',
      reviews: 128,
      envioGratis: true,
  descuento: undefined,
      isFavorite: false
    },
    {
  id: 2,
  nombre: 'Zapatillas Nike',
      imagen: 'https://m.media-amazon.com/images/I/61L5QgPvgxL._AC_SL1500_.jpg',
      pais: 'Unión Europea',
      flag: 'eu',
      precioUSD: 25,
  precioARS: 33000,
  categoria: 'moda',
      reviews: 86,
      envioGratis: true,
      descuento: 20,
      isFavorite: false
    },
    {
  id: 3,
  nombre: 'Cafe Colombiano Premium',
      imagen: 'https://m.media-amazon.com/images/I/71qod7R4YVL._AC_SL1500_.jpg',
      pais: 'Colombia',
      flag: 'col',
      precioUSD: 15,
  precioARS: 25000,
  categoria: 'alimentos',
      reviews: 245,
      envioGratis: true,
      descuento: 20,
      isFavorite: false
    },
    {
  id: 4,
  nombre: 'Camiseta de Fútbol Adidas',
      imagen: 'https://m.media-amazon.com/images/I/71s1LRpaprL._AC_SL1500_.jpg',
      pais: 'EE.UU.',
      flag: 'us',
      precioUSD: 90,
  precioARS: 189500,
  categoria: 'moda',
      reviews: 312,
      envioGratis: true,
  descuento: 10,
      isFavorite: false
    }
  ];
  categories = [
    { name: 'Tecnología', icon: 'laptop-outline' },
    { name: 'Moda', icon: 'shirt-outline' },
    { name: 'Alimentos', icon: 'fast-food-outline' },
    { name: 'Hogar', icon: 'home-outline' }
  ];
  cartCount = 0;
  showCart = false;
  cartItems: any[] = [];
  cartSubtotal = 0;
  shippingCost = 25;
  taxes = 0;
  cartTotal = 0;
  cartTotalARS = 0;
  showResult = false;
  // Simulador
  simValue = 100;
  simCountry = 'us';
  simCategory = 'tech';
  favoriteCount = 0;

  buttonStates: { [key: number]: { text: string; color: string } } = {};
  isAdding: { [key: number]: boolean } = {};
  // nueva variable para los productos filtrados
  productoBuscado: Producto[] = [];  // meto un array para almacenar los productos filtrados
// productoBuscado= any;
  
  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService,
    private router: Router
  ) {
    addIcons({
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
      homeOutline
    });
    this.productos = this.productosService.getProductos();
    this.carritoService.carrito$.subscribe(items => {
      this.cartItems = items;
      this.cartCount = items.reduce((sum, item) => sum + item.cantidad, 0);
      this.cartSubtotal = items.reduce((sum, item) => sum + item.precioUSD * item.cantidad, 0);
      this.taxes = this.cartSubtotal * 0.5;
      this.cartTotal = this.cartSubtotal + this.shippingCost + this.taxes;
      this.cartTotalARS = Math.round(this.cartTotal * 500);
    });
    // inicializa productoBuscado con todos los productos
    this.productoBuscado = [...this.productos];
  
  }
buscarProducto(event: any) {
    const text = event.target.value;
    if (!text || text.trim() === '') {
      this.productoBuscado = [...this.productos];  // acá restaura todos los productos si no hay texto
    } else {
      this.productoBuscado = this.productos.filter((producto: Producto) => {
        return producto.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
    }
  }
  addToCart(producto: Producto) {
    this.carritoService.addProducto(producto);
    // agregar que el botón cambie de color a verde y diga "Agregado"
    this.isAdding[producto.id] = true;
    this.buttonStates[producto.id] = { text: 'Agregado', color: 'success' };
  }
  calcularCosto() {
    this.showResult = true;
  }

  toggleFavorite(producto: any) {
    producto.isFavorite = !producto.isFavorite;
    this.favoriteCount = this.productos.filter(p => p.isFavorite).length;
  }

  goToCategory(category: any) {
    // navegación a la categoría, agregarlo
    alert('Ir a categoría: ' + category.name);
  }

  loadMore() {
    //  cargar más productos
    alert('Cargar más productos...');
  }

  toggleCart() {
    this.showCart = !this.showCart; //arreglar esto después
  }

  toggleMenu() {
    //  abrir menú lateral, usar más tarde
    alert('Abrir menú lateral');
  }

  closeCart() {
    this.showCart = false;
  }

  onCartDismiss() {
    this.showCart = false;
  }

  decreaseQuantity(item: any) {
    if (item.cantidad > 1) {
      this.carritoService.updateCantidad(item.id, item.cantidad - 1);
    }
  } 

  increaseQuantity(item: any) {
    this.carritoService.updateCantidad(item.id, item.cantidad + 1);
  }

  removeItem(item: any) {
    this.carritoService.removeProducto(item.id);
  }

  calculateCost() {
    // Simulación de costos
    this.showResult = true;
  }

  proceedToPayment() {
    alert('Ir a pago');
  }
}

document.getElementById("agregated")?.addEventListener('click', function() {
  this.style.backgroundColor = 'green';
  this.textContent = 'Agregado';
}); // corregir para el botón de agregar al carrito
