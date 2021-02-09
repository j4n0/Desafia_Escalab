interface IProducto {
    categoria: string;
    cod?: string;
    titulo: string;
    url?: any;
    precio:string;
    id?:string;
}
export class Producto implements IProducto {
    categoria: string;
    cod?: string;
    titulo: string;
    url?: any;
    precio:string;
    id?:string;
}