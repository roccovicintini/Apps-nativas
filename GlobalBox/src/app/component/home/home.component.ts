// imports de angular, ionic, formularios y servicios utilizados en la página de inicio
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProductosService, Producto } from '../../services/productos.service';
import { FavoritesService } from '../../services/favorites.service';
import { CarritoService } from '../../services/carrito.service';
// registro de iconos que se usarán en la vista
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
// router para navegar entre pantallas
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class HomeComponent implements OnInit {
  // estado principal de la vista y colecciones de productos
  isCategoryView = false;
  productos: Producto[] = [];
  productoBuscado: Producto[] = [];
  private loadedMore = false;
  
  // listado de categorías visibles en la sección de “categorías populares”
  categories = [
    { name: 'Tecnología', icon: 'laptop-outline' },
    { name: 'Moda', icon: 'shirt-outline' },
    { name: 'Alimentos', icon: 'fast-food-outline' },
    { name: 'Hogar', icon: 'home-outline' }
  ];
  
  // estado del carrito y derivados para mostrar totales y contadores
  cartCount = 0;
  showCart = false;
  cartItems: any[] = [];
  private carritoSub: Subscription | undefined;
  cartSubtotal = 0;
  shippingCost = 25;
  taxes = 0;
  cartTotal = 0;
  cartTotalARS = 0;
  showResult = false;
  
  // valores del simulador de costos y contador de favoritos
  simValue = 100;
  simCountry = 'us';
  simCategory = 'tech';
  favoriteCount = 0;

  // estados auxiliares para feedback de botones y carga de datos
  buttonStates: { [key: number]: { text: string; color: string } } = {};
  isAdding: { [key: number]: boolean } = {};
  cargando: boolean = true;
  
  constructor(
    // inyección de dependencias: servicio de productos, carrito, favoritos y router
    private productosService: ProductosService,
  private carritoService: CarritoService,
  private favorites: FavoritesService,
    private router: Router
  ) {
    // registrar los iconos que se van a usar en la plantilla
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


    // suscripción al carrito para calcular contadores y totales en tiempo real
    this.carritoSub = this.carritoService.carrito$.subscribe(items => {
      this.cartItems = Array.isArray(items) ? items : [];


      this.cartCount = this.cartItems.reduce((sum, item) => {
        const qty = Number(item?.cantidad) || 0;
        return sum + qty;
      }, 0);

      this.cartSubtotal = this.cartItems.reduce((sum, item) => {
        const qty = Number(item?.cantidad) || 0;
        const price = Number(item?.precio_usd ?? item?.precioUSD ?? item?.precio ?? item?.price) || 0;
        return sum + price * qty;
      }, 0);

      this.taxes = this.cartSubtotal * 0.5;
      this.cartTotal = this.cartSubtotal + this.shippingCost + this.taxes;
      this.cartTotalARS = Number.isFinite(this.cartTotal) ? Math.round(this.cartTotal * 500) : 0;
    });


    // suscripción a favoritos para mantener el contador y marcar los productos correspondientes
    this.favorites.favorites$.subscribe(list => {
      this.favoriteCount = list.length;

      const mark = (p: Producto) => ({
        ...p,
        isFavorite: this.favorites.isFavorite(p.id_productos)
      });
      this.productos = this.productos.map(mark);
      this.productoBuscado = this.productoBuscado.map(mark);
    });
  }

  ngOnDestroy() {
    // limpiar suscripciones al destruir el componente
    if (this.carritoSub) {
      this.carritoSub.unsubscribe();
      this.carritoSub = undefined;
    }
  }

  ngOnInit() {
    // carga inicial de productos al entrar a la vista
    this.cargarProductos();
  }

  cargarProductos() {
    // obtiene productos del backend y prepara la lista inicial
    this.cargando = true;
    this.productosService.getProductos().subscribe({
      next: (data) => {
        // Mostrar solo IDs 5-24 inicialmente y con imagen válida, marcando favoritos
        const base = (data || [])
          .filter(p => p.id_productos >= 5 && p.id_productos <= 24 && !!p.imagen && p.imagen.length > 0)
          .map(p => ({
            ...p,
            isFavorite: this.favorites.isFavorite(p.id_productos)
          }));
        this.productos = base;
        this.productoBuscado = [...base];
        this.cargando = false;
        console.log('Productos cargados desde backend:', this.productos);
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.cargando = false;
        this.usarDatosLocales();
      }
    });
  }

  private usarDatosLocales() {
    // datos locales de respaldo cuando la api no responde
    const productosLocales: Producto[] = [
      {
        id_productos: 1,
        nombre: 'Reloj',
        imagen: 'https://m.media-amazon.com/images/I/71TPda7cwUL._AC_SL1500_.jpg',
        precio_usd: 120,
        precio_ars: 160000,
        id_pais: 1,
        id_categoria: 1,
        envio_gratis: true,
        descuento: 0,
        reviews: 128,
        stock: 10,
        isFavorite: false,
        pais: 'EE.UU.',
        categoria: 'tecnologia'
      },
      {
        id_productos: 2,
        nombre: 'Zapatillas Nike',
        imagen: 'https://m.media-amazon.com/images/I/61L5QgPvgxL._AC_SL1500_.jpg',
        precio_usd: 25,
        precio_ars: 33000,
        id_pais: 2,
        id_categoria: 2,
        envio_gratis: true,
        descuento: 20,
        reviews: 86,
        stock: 15,
        isFavorite: false,
        pais: 'Unión Europea',
        categoria: 'moda'
      },
      {
        id_productos: 3,
        nombre: 'Cafe Colombiano Premium',
        imagen: 'https://m.media-amazon.com/images/I/71qod7R4YVL._AC_SL1500_.jpg',
        precio_usd: 15,
        precio_ars: 25000,
        id_pais: 5,
        id_categoria: 3,
        envio_gratis: true,
        descuento: 20,
        reviews: 245,
        stock: 50,
        isFavorite: false,
        pais: 'Colombia',
        categoria: 'alimentos'
      },
      {
        id_productos: 4,
        nombre: 'Camiseta de Fútbol Adidas',
        imagen: 'https://m.media-amazon.com/images/I/71s1LRpaprL._AC_SL1500_.jpg',
        precio_usd: 90,
        precio_ars: 189500,
        id_pais: 1,
        id_categoria: 2,
        envio_gratis: true,
        descuento: 10,
        reviews: 312,
        stock: 20,
        isFavorite: false,
        pais: 'EE.UU.',
        categoria: 'moda'
      }
    ];
    
    this.productos = productosLocales;
    this.productoBuscado = [...this.productos];
  }

  buscarProducto(event: any) {
    // filtra productos por nombre según el texto ingresado en el buscador
    const text = event.target.value;
    if (!text || text.trim() === '') {
      this.productoBuscado = [...this.productos];
    } else {
      this.productoBuscado = this.productos.filter((producto: Producto) => {
        return producto.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
    }
  }

  addToCart(producto: Producto) {
    // agrega un producto al carrito y muestra feedback temporal en el botón
    this.carritoService.addProducto(producto);
    const productId = producto.id_productos;
    this.isAdding[productId] = true;
    this.buttonStates[productId] = { text: 'Agregado', color: 'success' };
    
    setTimeout(() => {
      this.isAdding[productId] = false;
      delete this.buttonStates[productId];
    }, 2000);
  }

  calcularCosto() {
    // muestra el resumen del simulador
    this.showResult = true;
  }

  toggleFavorite(producto: Producto) {
    // alterna el estado de favorito y lo refleja en pantalla
    this.favorites.toggle(producto);

    producto.isFavorite = !producto.isFavorite;
  }

  goToCategory(category: any) {
    // normaliza texto quitando tildes y usando minúsculas
    const normalize = (str: string) => str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const categoryNameNorm = normalize(category.name);
    // mapeo de nombres: IDs que vienen del backend. en supabase las categorías tienen valor int
    const catIdMap: Record<string, number> = {
      'tecnologia': 1,
      'moda': 2,
      'alimentos': 3,
      'hogar': 4,
    };
    const targetId = catIdMap[categoryNameNorm] ?? -1;


    // decide la fuente de datos según si ya se cargaron más ítems o no
    const source = this.loadedMore ? this.productoBuscado : this.productos;

    // filtra por nombre de categoría o id numérico, manteniendo sólo productos con imagen
    this.productoBuscado = source.filter((producto: Producto) => {
      const byString = normalize(producto.categoria || '') === categoryNameNorm;
      const byNumeric = typeof (producto as any).id_categoria === 'number' && targetId > 0
        ? (producto as any).id_categoria === targetId
        : false;
      return (byString || byNumeric) && !!producto.imagen && producto.imagen.length > 0;
    });
    this.isCategoryView = true;
  }

  loadMore() {
    // si está en vista de categoría, volver a la lista completa antes de cargar más
    if (this.isCategoryView) {
      this.isCategoryView = false;
      this.productoBuscado = [...this.productos];
      return;
    }

    // evitar cargas duplicadas
    if (this.loadedMore) {
      return; // evitar duplicados si ya cargamos 25-48
    }

    // Obtener productos del servicio y filtrar por IDs 25-48 y con imagen pq algunos no tienen
    this.productosService.getProductos().subscribe({
      next: (productos: Producto[]) => {
        const nuevos = productos
          .filter(p => p.id_productos >= 25 && p.id_productos <= 48 && !!p.imagen && p.imagen.length > 0)
          .map(p => ({
            ...p,
            isFavorite: this.favorites.isFavorite(p.id_productos)
          }));
        this.productoBuscado.push(...nuevos);
        this.loadedMore = true;
      },
      error: (err) => {
        console.error('Error al cargar más productos:', err);
      }
    });
  }

  toggleCart() {
    // abre o cierra el panel del carrito
    this.showCart = !this.showCart;
  }

  toggleMenu() {
    // placeholder para abrir el menú lateral
    alert('Abrir menú lateral');
  }

  closeCart() {
    // cierra el panel del carrito
    this.showCart = false;
  }

  onCartDismiss() {
    // evento de cierre cuando el panel se descarta
    this.showCart = false;
  }

  decreaseQuantity(item: any) {
    // disminuye la cantidad del ítem si es mayor a 1
    if (item.cantidad > 1) {
      this.carritoService.updateCantidad(item.id_productos || item.id, item.cantidad - 1);
    }
  } 

  increaseQuantity(item: any) {
    // aumenta la cantidad del ítem en el carrito
    this.carritoService.updateCantidad(item.id_productos || item.id, item.cantidad + 1);
  }

  removeItem(item: any) {
    // elimina el ítem del carrito
    this.carritoService.removeProducto(item.id_productos || item.id);
  }

  calculateCost() {
    // muestra el resultado del simulador (alias de calcularCosto)
    this.showResult = true;
  }

  proceedToPayment() {
    // placeholder para navegación a la pantalla de pago
    alert('Ir a pago');
  }
}
