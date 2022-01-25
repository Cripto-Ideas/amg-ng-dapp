import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  private windowBrowser: any;
  private mainAccount: any;

  constructor() { 
    this.windowBrowser = window;
  }

  async loadWeb3() {
    
    console.log(this.windowBrowser.ethereum);

    if(this.windowBrowser.ethereum) {
      console.log('es eth');
      this.windowBrowser.web3 = new Web3(this.windowBrowser.ethereum)
      await this.windowBrowser.ethereum.enable()
    }

    else if (this.windowBrowser.web3) {
      this.windowBrowser.web3 = new Web3(this.windowBrowser.web3.currentProvider)
    }

    else {
      window.alert('¡Considera usar Metamask!')
    }

    console.log(this.windowBrowser.web3);
  }

  async loadBlockchainData() {
    const web3 = this.windowBrowser.web3
    // Cargar una cuenta
    const accounts = await web3.eth.getAccounts()
    console.log(accounts);
    console.log(await web3.eth);
    
    this.mainAccount = accounts[0];   
    console.log(this.mainAccount);
  }

}
