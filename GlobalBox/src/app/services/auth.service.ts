import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap, catchError } from 'rxjs';

export interface AuthUser {
	id_usuario: number;
	username: string;
}

export interface LoginResponse {
	token: string;
	user: AuthUser;
}

export interface Cliente {
	id_cliente: number;
	id_usuario: number;
	nombre: string | null;
	apellido: string | null;
	email: string | null;
	telefono: string | null;
	fecha_nacimiento: string | null; 
}

export interface Direccion {
	id_direccion?: number;
	pais: string | null;
	provincia: string | null;
	ciudad?: string | null;
	calle: string | null;
	localidad?: string | null;
	altura: string | null;
	piso?: string | null;
	codigo_postal?: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
	private apiBase = 'http://localhost:3000';
	private TOKEN_KEY = 'auth_token';
	private USER_KEY = 'auth_user';

	private currentUserSubject = new BehaviorSubject<AuthUser | null>(this.readStoredUser());
	public currentUser$ = this.currentUserSubject.asObservable();

	constructor(private http: HttpClient) {}


	login(username: string, email: string, password: string): Observable<LoginResponse> {
		return this.http
			.post<LoginResponse>(`${this.apiBase}/api/auth/login`, { username, email, password })
			.pipe(
				tap((res) => this.persistSession(res)),
				catchError((err) => {
					console.error('Login error', err);
					throw err;
				})
			);
	}

	register(username: string, email: string, password: string): Observable<LoginResponse> {
		return this.http
			.post<LoginResponse>(`${this.apiBase}/api/auth/register`, { username, email, password })
			.pipe(
				tap((res) => this.persistSession(res)),
				catchError((err) => {
					console.error('Register error', err);
					throw err;
				})
			);
	}

	logout(): void {
		localStorage.removeItem(this.TOKEN_KEY);
		localStorage.removeItem(this.USER_KEY);
		this.currentUserSubject.next(null);
	}

	getToken(): string | null {
		return localStorage.getItem(this.TOKEN_KEY);
	}

	isAuthenticated(): boolean {
		return !!this.getToken();
	}

	getAuthHeaders(): { headers: HttpHeaders } {
		const token = this.getToken();
		return {
			headers: new HttpHeaders({
				Authorization: token ? `Bearer ${token}` : '',
			}),
		};
	}

	
	getClienteByUsername(username: string): Observable<Cliente> {
		return this.http.get<Cliente>(`${this.apiBase}/api/cliente`, {
			params: { username },
			...this.getAuthHeaders(),
		});
	}

	updateCliente(idCliente: number, data: Partial<Cliente>): Observable<Cliente> {
		return this.http.put<Cliente>(`${this.apiBase}/api/cliente/${idCliente}`, data, this.getAuthHeaders());
	}

	getDireccionesByUsuarioId(usuarioId: number): Observable<Direccion[]> {
		return this.http.get<Direccion[]>(`${this.apiBase}/api/direccion/${usuarioId}`, this.getAuthHeaders());
	}

	createDireccionForUsuario(usuarioId: number, data: Direccion): Observable<Direccion> {
		return this.http.post<Direccion>(`${this.apiBase}/api/direccion/${usuarioId}`, data, this.getAuthHeaders());
	}

	private persistSession(res: LoginResponse) {
		localStorage.setItem(this.TOKEN_KEY, res.token);
		localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
		this.currentUserSubject.next(res.user);
	}

	private readStoredUser(): AuthUser | null {
		try {
			const raw = localStorage.getItem(this.USER_KEY);
			return raw ? (JSON.parse(raw) as AuthUser) : null;
		} catch {
			return null;
		}
	}
}

