import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection} from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../core/services/model/producto.interface';
import { FileI} from '../services/model/file.interface'
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private postsCollection: AngularFirestoreCollection<Producto>;
  private filePath: any;
  private downloadURL: Observable<string>;
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];


  constructor( 
    private http: HttpClient,
    private fire:AngularFirestore,
    private storage: AngularFireStorage
     ) {

      this.postsCollection = fire.collection<Producto>('productos_idx');
    this.cargarProductos();

  }

 
  private cargarProductos() {

    return new Promise(  ( resolve, reject ) => {

      this.http.get('https://ngblog-46b68-default-rtdb.firebaseio.com/productos_idx.json')
          .subscribe( (resp: Producto[]) => {
            this.productos = resp;
            setTimeout(() => {
              this.cargando = false;
            }, 2000);

  
          });

    });

  }

  getProducto( id: string ) {

    //return this.http.get(`https://proyecto1-13fc6.firebaseio.com/Productos/${id}.json`)
    return this.http.get(`https://ngblog-46b68-default-rtdb.firebaseio.com/productos_idx/${id}.json`);

  }

  public getAllProducto(): Observable<Producto[]> {
    return this.postsCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Producto;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }


  findCharacterById(id: string) {
    return this.http.get(`https://ngblog-46b68-default-rtdb.firebaseio.com/productos_idx/${id}.json`);
  }

  findAllCharacters(){
   return this.http.get(`https://ngblog-46b68-default-rtdb.firebaseio.com/productos_idx.json`);
  }

  findCharacterByName(name: string) {
    return this.http.get<any>(`https://ngblog-46b68-default-rtdb.firebaseio.com/productos_idx?titulo=${name}.json`);
  }

  buscarProducto( termino: string ) {
    if ( this.productos.length === 0 ) {
      // cargar productos
      this.cargarProductos().then( () => {
        // ejecutar después de tener los productos
        // Aplicar filtro
        this.filtrarProductos( termino );
      });

    } else {
      // aplicar el filtro
      this.filtrarProductos( termino );
    }


  }

  private filtrarProductos( termino: string ) {

    // console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0  ) {
        this.productosFiltrado.push( prod );
      }

    });


  }

  public deletePostById(producto: Producto) {
    return this.postsCollection.doc(producto.id).delete();
    
  }


  public editPostById(producto: Producto, newImage?: FileI) {
    console.log('producto', producto);
    
    if (newImage) {
      this.uploadImage(producto, newImage);
    } else {
      return this.postsCollection.doc(producto.id).update(producto);
    }
  }


  private savePost(producto: Producto) {
    console.log('producto', producto);

    const postObj = {
      titulo: producto.titulo,
      categoria: producto.categoria,
      url: this.downloadURL,
      cod: this.filePath,
      precio: producto.precio
    };

    if (producto.id) {
      return this.postsCollection.doc(producto.id).update(postObj);
    } else {
      return this.postsCollection.add(postObj);
    }

  }

  public preAddAndUpdatePost(producto: Producto, image: FileI): void {
    this.uploadImage(producto, image);
  }

  private uploadImage(producto: Producto, image: FileI) {
    this.filePath = `productos/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            console.log('Url Image', urlImage);
            console.log('producto ', producto)
            //llamar metodo que guarda
            this.savePost(producto);
          });
        })
      ).subscribe();
  }
}
