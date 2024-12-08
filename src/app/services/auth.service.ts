import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ethers } from 'ethers';  // Importamos ethers.js correctamente
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';  // URL de tu backend
  private provider: ethers.BrowserProvider | null = null; // Usamos BrowserProvider de ethers.js
  private signer: ethers.JsonRpcSigner | null = null;  // Cambiamos Signer a JsonRpcSigner
  private userAddress: string = '';  // Dirección del usuario

  constructor(private http: HttpClient) {}

  // Verificar si MetaMask está instalado
  isMetaMaskInstalled(): boolean {
    return typeof window.ethereum !== 'undefined';
  }

  // Conectar a MetaMask y obtener la dirección del usuario
  async connectToMetaMask(): Promise<string> {
    if (!this.isMetaMaskInstalled()) {
      alert('MetaMask no está instalado.');
      throw new Error('MetaMask no está instalado.');
    }

    try {
      // Solicitar acceso a la cuenta de MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Crear un proveedor con ethers.js utilizando MetaMask (BrowserProvider)
      this.provider = new ethers.BrowserProvider(window.ethereum);  // Usamos BrowserProvider

      // Obtener el firmante de MetaMask
      if (this.provider) {
        this.signer = await this.provider.getSigner();  // Usamos JsonRpcSigner aquí
        this.userAddress = await this.signer.getAddress();  // Obtener la dirección del usuario
      }

      // Almacenar la dirección del usuario en localStorage para mantener la sesión
      //localStorage.setItem('address', this.userAddress);

      return this.userAddress;
    } catch (err) {
      console.error('Error conectando a MetaMask:', err);
      throw new Error('No se pudo conectar a MetaMask');
    }
  }

  // Login con la dirección de MetaMask
  login(userAddress: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { userAddress });
  }

  // Registro de un nuevo usuario
  register(firstName: string, lastName: string, userAddress:string): Observable<any> {
    if (!userAddress) {
      throw new Error('No se ha conectado MetaMask.');
    }

    return this.http.post<any>(`${this.apiUrl}/register`, {
      userAddress: userAddress,
      firstName,
      lastName
    });
  }

  // Comprobar si el usuario está autenticado
  isAuthenticated(): boolean {
    const address = localStorage.getItem('address');
    return address ? true : false;
  }

  // Cerrar sesión
  logOut() {
    localStorage.clear();
    this.userAddress = '';
    this.signer = null;
    this.provider = null;
  }

  // Obtener la dirección del usuario
  getUserAddress(): string {
    return this.userAddress;
  }

    // Obtener la cuenta actual de MetaMask
    async getAccount(): Promise<string> {
      return await this.signer!.getAddress();
    }
  
    // Obtener el proveedor de MetaMask
    getProvider(): ethers.BrowserProvider {
      return this.provider!;
    }
  
    // Obtener el firmante de MetaMask
    getSigner(): ethers.Signer {
      return this.signer!;
    }

  // Función para enviar donaciones o actualizaciones si es necesario
  async updateUserAmountSpent(amount: string): Promise<any> {
    if (!this.signer) {
      throw new Error('MetaMask no está conectado.');
    }

    const contract = new ethers.Contract('0x7Deb4e191000785945C3ab9e0b937d068E1acACD', [], this.signer); // Dirección del contrato
    const tx = await contract['updateAmountSpent'](ethers.parseEther(amount));  // Enviar la transacción
    await tx.wait();  // Espera la confirmación de la transacción
    return tx;
  }
}
