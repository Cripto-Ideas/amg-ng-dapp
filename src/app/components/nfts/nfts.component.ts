import { Component, OnInit } from '@angular/core';
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
  //nftAddress: any = Color.networks['5777'].address;
  nftAddress: any = '0x66bdd8e9c20452FB2F4CA69Ee0522A22c3F68f64';
  totalSupply: any;

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

    this.bc.getTotalSupply().then( value => { 
      console.log('totalSupply:',value);
      this.totalSupply = value;
    });

  }

}
