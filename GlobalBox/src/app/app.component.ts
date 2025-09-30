import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  // Variables para el carrito
  cartCount = 0;
  cartItems: any[] = [];
  showCart = false;
  cartSubtotal = 0;
  shippingCost = 0;
  taxes = 0;
  cartTotal = 0;
  cartTotalARS = 0;
  // variables para el menú
  // cambiarle a los componentes el icono y el título
  public appComponent= [
    {
      title: 'Home', url: '/home', icon: 'home-outline'
    },
    {
      title: 'Carrito', url: '/carrito', icon: 'cart-outline'
    },
    {
      title: 'Rastreo', url: '/rastreo', icon: 'arrow-forward-outline'
    },
  ]

  // variable para simulador de costos
  showResult = false;

  // variables de categorías y productos
  categories = [
    { name: 'Tecnología', icon: 'laptop-outline' },
    { name: 'Moda', icon: 'shirt-outline' },
    { name: 'Alimentos', icon: 'fast-food-outline' },
    { name: 'Hogar', icon: 'home-outline' }
  ];
  products = [
    {
      name: 'Producto 1',
      image: 'https://via.placeholder.com/150',
      country: 'us',
      countryName: 'Estados Unidos',
      reviews: 120,
      price: 100,
      arsPrice: 50000,
      isFavorite: false
    },
    {
      name: 'Producto 2',
      image: 'https://via.placeholder.com/150',
      country: 'eu',
      countryName: 'Unión Europea',
      reviews: 80,
      price: 150,
      arsPrice: 75000,
      isFavorite: false
    }
  ];

  constructor() {}

  // métodos del carrito
  toggleCart() {
    this.showCart = !this.showCart;
  }
  closeCart() {
    this.showCart = false;
  }
  onCartDismiss() {
    this.showCart = false;
  }
  addToCart(product: any) {
    const item = this.cartItems.find(i => i.name === product.name);
    if (item) {
      item.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.updateCartTotals();
  }
  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(i => i.name !== item.name);
    this.updateCartTotals();
  }
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartTotals();
    }
  }
  increaseQuantity(item: any) {
    item.quantity++;
    this.updateCartTotals();
  }
  updateCartTotals() {
    this.cartCount = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    this.cartSubtotal = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    this.shippingCost = this.cartSubtotal > 0 ? 25 : 0;
    this.taxes = this.cartSubtotal * 0.5;
    this.cartTotal = this.cartSubtotal + this.shippingCost + this.taxes;
    this.cartTotalARS = this.cartTotal * 500;
  }

  // métodos de productos y favoritos
  toggleFavorite(product: any) {
    product.isFavorite = !product.isFavorite;
  }
  loadMore() {
    // simulación de carga de más productos
    this.products.push({
      name: 'Producto nuevo',
      image: 'https://via.placeholder.com/150',
      country: 'cn',
      countryName: 'China',
      reviews: 50,
      price: 80,
      arsPrice: 40000,
      isFavorite: false
    });
  }
  goToCategory(category: any) {
    // navegación simulada
    alert('Ir a categoría: ' + category.name);
  }

  // métodos de simulador de costos
  calculateCost() {
    this.showResult = true;
  }

  // métodos de menú y pago
  toggleMenu() {
    // simulación de menú
    alert('Menú abierto');
  }
  proceedToPayment() {
    alert('Proceder al pago');
  }
}
