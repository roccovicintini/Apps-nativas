import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AuthService, AuthUser, Direccion, Cliente } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './perfil.component.html'
})
export class PerfilComponent {
  // UI state
  isRegistering = false;
  isEditingProfile = false;
  isEditingAddress = false;

  // Auth state
  user: AuthUser | null = null;
  username = '';
  password = '';
  email = '';

  // Profile fields
  nombre = '';
  apellido = '';

  // Address fields
  calle = '';
  altura = '';
  provincia = '';
  pais = '';

  constructor(public auth: AuthService) {
    this.auth.currentUser$.subscribe(u => {
      this.user = u;
      if (u) {
        this.loadAccountData(u);
      }
    });
  }

  private loadAccountData(u: AuthUser) {
    // Cargar datos básicos del cliente para prefijar campos del perfil
    this.auth.getClienteByUsername(u.username).subscribe({
      next: (cli: Cliente) => {
        this.nombre = cli?.nombre ?? '';
        this.apellido = cli?.apellido ?? '';
      },
      error: () => {
        // Silenciar errores en este componente secundario
      },
    });
  }

  get isLoggedIn() { return !!this.user; }

  showRegister() { this.isRegistering = true; }
  showLogin() { this.isRegistering = false; }

  handleLogin() {
    if (!this.username || !this.password || !this.email) return;
    if (!this.email.includes('@')) return;
    this.auth.login(this.username, this.email, this.password).subscribe();
  }

  handleRegister() {
    if (!this.username || !this.password || !this.email) return;
    if (!this.email.includes('@')) return;
    this.auth.register(this.username, this.email, this.password).subscribe(_ => {
      this.auth.login(this.username, this.email, this.password).subscribe();
      this.isRegistering = false;
    });
  }

  saveProfile() {
    if (!this.user) return;
    // Buscar el cliente por username y luego actualizar nombre/apellido
    this.auth.getClienteByUsername(this.user.username).subscribe({
      next: (cli: Cliente) => {
        if (!cli || !cli.id_cliente) return;
        this.auth.updateCliente(cli.id_cliente, { nombre: this.nombre, apellido: this.apellido }).subscribe(() => {
          this.isEditingProfile = false;
        });
      },
      error: () => {
        // sin acción
      }
    });
  }
  saveAddress() {
    if (!this.user) return;
    if (!this.calle || !this.pais || !this.provincia || !this.altura) return;
    const payload: Direccion = {
      calle: this.calle,
      altura: this.altura,
      provincia: this.provincia,
      pais: this.pais,
      ciudad: null,
      localidad: null,
      piso: null,
      codigo_postal: null,
    };
    this.auth.createDireccionForUsuario(this.user.id_usuario, payload).subscribe(() => {
      this.isEditingAddress = false;
    });
  }

  logout() { this.auth.logout(); }
}
