import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AuthService, Cliente, Direccion, AuthUser } from '../../services/auth.service';
import { FavoritesService } from '../../services/favorites.service';
import { Producto } from '../../services/productos.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  segment: 'login' | 'register' | 'account' = 'login';
  loading = false;
  toastOpen = false;
  toastMessage = '';

  // form de login
  loginUsername = '';
  loginEmail = '';
  loginPassword = '';
  loginError = '';

  // form de registro
  regUsername = '';
  regEmail = '';
  regPassword = '';
  regConfirm = '';
  regError = '';

  // datos de la cuenta
  user: AuthUser | null = null;
  cliente: Cliente | null = null;
  direcciones: Direccion[] = [];

  // form para editar el perfil
  nombre = '';
  apellido = '';
  telefono = '';
  fecha_nacimiento = '';

  // form de la dirección
  addr_pais = '';
  addr_provincia = '';
  addr_ciudad = '';
  addr_calle = '';
  addr_localidad = '';
  addr_altura = '';
  addr_piso = '';
  addr_cp = '';

 
  showMenu = false;
  showPerfilModal = false;
  showDireccionModal = false;
  showFavoritosModal = false;

  favoritos: Producto[] = [];

  constructor(public auth: AuthService, private favorites: FavoritesService) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.user = this.getCurrentUser();
      this.segment = 'account';
      this.loadAccountData();
    } else {
      this.segment = 'login';
    }


    this.favorites.favorites$.subscribe(list => {
      this.favoritos = list || [];
    });
  }


  private getCurrentUser(): AuthUser | null {
    let u: AuthUser | null = null;
    this.auth.currentUser$.subscribe(val => (u = val)).unsubscribe();
    return u;
  }

  private presentToast(message: string) {
    this.toastMessage = message;
    this.toastOpen = true;
    setTimeout(() => (this.toastOpen = false), 2500);
  }

  // autorizaciones
  onLogin() {
    this.loginError = '';
    if (!this.loginEmail || !this.loginPassword) {
      this.loginError = 'Email y contraseña son obligatorios.';
      return;
    }
    if (!this.loginEmail.includes('@')) {
      this.loginError = 'El correo debe contener @.';
      return;
    }
    this.loading = true;
    this.auth
      .login(this.loginUsername, this.loginEmail, this.loginPassword)
      .subscribe({
        next: () => {
          this.loading = false;
          this.user = this.getCurrentUser();
          this.segment = 'account';
          this.loadAccountData();
          this.presentToast('Has iniciado sesión.');
        },
        error: () => {
          this.loading = false;
          this.loginError = 'Usuario o contraseña inválidos.';
        },
      });
  }

  onRegister() {
    this.regError = '';
    if (!this.regEmail || !this.regPassword || !this.regUsername) {
      this.regError = 'Username, email y contraseña son obligatorios.';
      return;
    }
    if (!this.regEmail.includes('@')) {
      this.regError = 'El correo debe contener @.';
      return;
    }
    this.loading = true;
    this.auth
      .register(this.regUsername, this.regEmail, this.regPassword)
      .subscribe({
        next: () => {
          this.loading = false;
          this.user = this.getCurrentUser();
          // Cargar datos de cuenta usando el username de registro
          this.segment = 'account';
          this.loginUsername = this.regUsername;
          this.loadAccountData();
          this.presentToast('Cuenta creada. Has iniciado sesión.');
        },
        error: () => {
          this.loading = false;
          this.regError = 'No se pudo crear la cuenta. Intenta con otro username.';
        },
      });
  }

  logout() {
    this.auth.logout();
    this.segment = 'login';
    this.user = null;
    this.cliente = null;
    this.direcciones = [];
  }

  // Carga de datos de la cuenta
  loadAccountData() {
    if (!this.user) return;
    const username = this.loginUsername || this.regUsername || this.user.username;
    this.loading = true;
    this.auth.getClienteByUsername(username).subscribe({
      next: (cli) => {
        this.cliente = cli;
        this.nombre = cli?.nombre ?? '';
        this.apellido = cli?.apellido ?? '';
        this.telefono = cli?.telefono ?? '';

        this.fecha_nacimiento = cli?.fecha_nacimiento ? ('' + cli.fecha_nacimiento).substring(0, 10) : '';

        // Direcciones
        this.auth.getDireccionesByUsuarioId(this.user!.id_usuario).subscribe({
          next: (dirs) => {
            this.direcciones = dirs || [];
            this.loading = false;
          },
          error: () => {
            this.loading = false;
            this.direcciones = [];
          },
        });
      },
      error: () => {
        this.loading = false;
        this.presentToast('Error al cargar datos de la cuenta.');
      },
    });
  }

  // Update de perfil
  onSaveProfile() {
    if (!this.cliente) return;
    this.loading = true;
    const payload = {
      nombre: this.nombre,
      apellido: this.apellido,
      telefono: this.telefono,
      fecha_nacimiento: this.fecha_nacimiento || null,
    } as Partial<Cliente>;

    this.auth.updateCliente(this.cliente.id_cliente, payload).subscribe({
      next: (cli) => {
        this.loading = false;
        this.cliente = cli;
        this.presentToast('Perfil actualizado.');
      },
      error: () => {
        this.loading = false;
        this.presentToast('Error al actualizar el perfil.');
      },
    });
  }

  // subir/editar dirección
  onSaveAddress() {
    if (!this.user) return;
    if (!this.addr_calle || !this.addr_pais || !this.addr_provincia || !this.addr_altura) {
      this.presentToast('Complete los campos requeridos de dirección.');
      return;
    }
    this.loading = true;
    const payload: Direccion = {
      pais: this.addr_pais || null,
      provincia: this.addr_provincia || null,
      ciudad: this.addr_ciudad || null,
      calle: this.addr_calle || null,
      localidad: this.addr_localidad || null,
      altura: this.addr_altura || null,
      piso: this.addr_piso || null,
      codigo_postal: this.addr_cp || null,
    };

    this.auth.createDireccionForUsuario(this.user.id_usuario, payload).subscribe({
      next: () => {
        this.loading = false;
        this.presentToast('Dirección guardada correctamente.');
        this.clearAddressForm();
        this.loadAccountData();
      },
      error: () => {
        this.loading = false;
        this.presentToast('Error al guardar la dirección.');
      },
    });
  }

  prefillAddress(addr: Direccion) {
    this.addr_pais = addr.pais || '';
    this.addr_provincia = addr.provincia || '';
    this.addr_ciudad = addr.ciudad || '';
    this.addr_calle = addr.calle || '';
    this.addr_localidad = addr.localidad || '';
    this.addr_altura = addr.altura || '';
    this.addr_piso = addr.piso || '';
    this.addr_cp = addr.codigo_postal || '';
  }

  clearAddressForm() {
    this.addr_pais = '';
    this.addr_provincia = '';
    this.addr_ciudad = '';
    this.addr_calle = '';
    this.addr_localidad = '';
    this.addr_altura = '';
    this.addr_piso = '';
    this.addr_cp = '';
  }
}
