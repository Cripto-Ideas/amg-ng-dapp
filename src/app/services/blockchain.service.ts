import { Injectable } from '@angular/core';
import Web3 from 'web3';

import Color from '../abi/Color.json';

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
    console.log('BlockchainService :: loadBlockchainData :: start');

    const web3 = this.windowBrowser.web3;

    // Cargar una cuenta
    const accounts = await web3.eth.getAccounts();
    console.log('Web3 Object: ',await web3.eth);
    console.log('Cuentas: ', accounts);
    
    this.mainAccount = accounts[0];   
    console.log('Main Cuenta: ', this.mainAccount);
  }

  public async getAccount(): Promise<any> {
    console.log('BlockchainService :: getAccount :: start');

    await this.loadBlockchainData();

    if (this.mainAccount == null) {
      this.mainAccount = await new Promise((resolve, reject) => {
        console.log('BlockchainService :: getAccount:', this.mainAccount);
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


  public async getNFTs(): Promise<any> {
    console.log('transfer.service :: getNFTs :: start');

    await this.loadBlockchainData();

    const web3 = this.windowBrowser.web3

    // Cargar un contrato
    const networkId = '5777'
    const networkData = Color.networks[networkId]
    if(networkData) {
      const abi = Color.abi 
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      //console.log('contractAddress:', networkData.address)
      //console.log('contract:', contract)

      
      // Función 'totalSupply' del Smart Contract
      const totalSupply = await contract.methods.totalSupply().call()
      //console.log('totalSupply:', totalSupply)

      // Carga de NFTs
      const colors: string[] = [];

      for (var i = 1; i<=totalSupply; i++){
        const color = await contract.methods.colors(i-1).call();
        colors.push(color);
        //{ colors: [...colors, color] };
      }
      //console.log('NFTs:', colors);

      const nfts = { 
        "contractAddress" : networkData.address,
        "totalSupply": totalSupply,
        "NFTs": colors
      }
      console.log('NFTs:', nfts);

      //return totalSupply;

      return new Promise ( (resolve) =>
        resolve( nfts )
        );  

    } else {
      window.alert('¡Smart Contract no desplegado en la red!')
    }
  }


}
