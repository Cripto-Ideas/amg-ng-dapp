import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  constructor() { }

  async loadWeb3() {
    
    console.log((window as any).ethereum);

    /*if((window as any).ethereum) {
      console.log('es eth');
      (window as any).web3 = new Web3((window as any).ethereum)
      await (window as any).ethereum.enable()
    }

    else if ((window as any).web3) {
      (window as any).web3 = new Web3((window as any).web3.currentProvider)
    }

    else {
      window.alert('¡Considera usar Metamask!')
    }

    console.log((window as any).web3);*/
  }

}
