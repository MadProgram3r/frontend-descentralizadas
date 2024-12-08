import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DonationService {

  private contractAddress: string = '0x09FC14595491a761438C48a9b94d76AFA2De281A'; // Reemplaza con la dirección del contrato
  private walletContractABI = [
    "function deposit() payable"
  ];


  constructor(private metaMaskService: AuthService) {
    // Inicializamos el contrato
    
    
  }

  // Realizar una donación
  async donateToCause(amount: string) {
    this.metaMaskService.connectToMetaMask()
    console.log(this.metaMaskService.getUserAddress())
    console.log(this.metaMaskService.getSigner())
    let walletMultiSigContract = new ethers.Contract(
      this.contractAddress,
      this.walletContractABI,
      this.metaMaskService.getSigner()
    );
    try {
      // Convertir el monto de Ether a Wei
      const weiAmount = ethers.parseEther(amount);

      // Realizar la donación al contrato
      const tx = await walletMultiSigContract['deposit']({
        value: weiAmount
      });

      // Esperar a que la transacción sea confirmada
      await tx.wait();
      
      return tx.hash;

    } catch (error) {
      console.log(error)
      throw new Error("Error al realizar la donación");
    }
  }
}
