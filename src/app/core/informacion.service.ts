import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  info:any =[];
  cargada_info:boolean = false;

  cargando=true;



  constructor( public http :HttpClient) {


    this.carga_informacion ();

   }

   /**
    * carga_informacion
    */
   public carga_informacion() {
    this.http.get("assets/Data/Info.pagina.json")
    .subscribe(data =>{
      
      //console.log(data);
      this.cargada_info = true;
      this.info = (data);
    
    });
   }

   /**
    * Carga_Familia
    */
   

}

