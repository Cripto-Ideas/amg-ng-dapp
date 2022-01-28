import { Component, Input, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

//import Color from '../abi/Color.json';

@Component({
  selector: 'app-nfts',
  templateUrl: './nfts.component.html',
  styleUrls: ['./nfts.component.css']
})
export class NftsComponent implements OnInit {

  account: any;
  balance: any;
  infoNFTs: any;
  //@Input() nuevoNFT='#880000';

  constructor(private bc: BlockchainService) { }

  ngOnInit(): void {
    this.bc.loadWeb3();
    this.bc.loadBlockchainData();

    this.bc.getAccount().then( account => { 
      console.log('cuenta:',account);
      this.account = account;
    });

    this.bc.getBalance().then( value => { 
      console.log('balance:',value);
      this.balance = value;
    });

    this.bc.getNFTs().then( value => { 
      console.log('getNFTs:',value);
      this.infoNFTs = value;
    });

  }

  agregar(nuevoNFT: string) {
    if ( nuevoNFT.trim().length === 0 ) { return; }
    
    console.log('NuevoNFT', nuevoNFT);
    this.bc.mintNFT( nuevoNFT );

    //this.nuevoNFT = ''; // lo blanqueo despues de insertar

  }

}
