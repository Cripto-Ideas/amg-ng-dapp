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

  public async getAccount(): Promise<any> {
    console.log('transfer.service :: getAccount :: start');

    await this.loadBlockchainData();

    if (this.mainAccount == null) {
      this.mainAccount = await new Promise((resolve, reject) => {
        console.log('transfer.service :: getAccount :: eth');
        /*console.log(this.windowBrowser.web3.eth);
        this.windowBrowser.web3.eth.getAccounts((err, retAccount) => {
          console.log('transfer.service :: getAccount: retAccount');
          console.log(retAccount);
          if (retAccount.length > 0) {
            this.mainAccount = retAccount[0];
            resolve(this.mainAccount);
          } else {
            alert('transfer.service :: getAccount :: no accounts found.');
            reject('No accounts found.');
          }
          if (err != null) {
            alert('transfer.service :: getAccount :: error retrieving account');
            reject('Error retrieving account');
          }
        }); */

        resolve(this.mainAccount);

      }) as Promise<any>;
    }
    return Promise.resolve(this.mainAccount);
  }


  public async getBalance(): Promise<any> {
    console.log('transfer.service :: getBalance :: start');

    const web3 = this.windowBrowser.web3

    await this.loadBlockchainData();
    
    // Cargar una cuenta
    const resu = await web3.eth.getBalance(this.mainAccount);
    return resu;
  }

}
