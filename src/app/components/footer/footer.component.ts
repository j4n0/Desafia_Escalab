import { Component, OnInit } from '@angular/core';

import {InformacionService} from '../../core/informacion.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  anio:number = new Date().getFullYear();
  
  constructor(    public _is:InformacionService) { }

  ngOnInit() {
  }

}
