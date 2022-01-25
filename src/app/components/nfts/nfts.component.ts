import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-nfts',
  templateUrl: './nfts.component.html',
  styleUrls: ['./nfts.component.css']
})
export class NftsComponent implements OnInit {

  constructor(private bc: BlockchainService) { }

  ngOnInit(): void {
    this.bc.loadWeb3();
    this.bc.loadBlockchainData();
  }

}
