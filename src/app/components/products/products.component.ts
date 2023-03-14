import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ProductsState, ProductsStateEnum } from 'src/app/ngrx/products.reducer';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
//   products$: Observable<AppDataState<Product[]>> | null=null;
  readonly ProductsStateEnum=ProductsStateEnum;

//   constructor(private productService:ProductsService,private router:Router){}

  productsState$:Observable<ProductsState> | null=null;
  constructor(private store:Store<any>){}
  ngOnInit(): void {
    this.productsState$=this.store.pipe(
      map((state)=>state.catalogState)
    )
  }

//   onGetAllProducts(){
//     console.log("start...")
//     this.products$=this.productService.getAllProducts().pipe(
//       map(data=>{
//         console.log(data);
//         return({dataState:DataStateEnum.LOADED,data:data})}),
//       startWith({dataState:DataStateEnum.LOADING}),
//       catchError(err=>of({dataState: DataStateEnum.ERROR,errorMessage:err.message}))
//       );
//   }

//   onGetSelectedProducts(){
//     this.products$=this.productService.getSelectedProducts().pipe(
//       map(data=>{
//         console.log(data);
//         return({dataState:DataStateEnum.LOADED,data:data})}),
//       startWith({dataState:DataStateEnum.LOADING}),
//       catchError(err=>of({dataState: DataStateEnum.ERROR,errorMessage:err.message}))
//       );
//   }

//   onGetAvailableProducts(){
//     this.products$=this.productService.getAvailableProducts().pipe(
//       map(data=>{
//         console.log(data);
//         return({dataState:DataStateEnum.LOADED,data:data})}),
//       startWith({dataState:DataStateEnum.LOADING}),
//       catchError(err=>of({dataState: DataStateEnum.ERROR,errorMessage:err.message}))
//       );
//   }

//   onSearch(dataForm:any){
//     this.products$=this.productService.searchProducts(dataForm.keyword).pipe(
//       map(data=>{
//         console.log(data);
//         return({dataState:DataStateEnum.LOADED,data:data})}),
//       startWith({dataState:DataStateEnum.LOADING}),
//       catchError(err=>of({dataState: DataStateEnum.ERROR,errorMessage:err.message}))
//       );
//   }

//   onSelect(p:Product){
//     this.productService.selectProducts(p)
//       .subscribe(data => {p.selected=data.selected;});
//   }

//   onDelete(p:Product){
//     let v=confirm("Voulez-vous vraiment supprimer?");
//     if(v==true)
//     this.productService.deleteProducts(p)
//       .subscribe(data => {this.onGetAllProducts();});
//   }

//   onNewProduct(){
//     console.log("bonjour")
//     this.router.navigateByUrl("/newProduct")
//   }

//   onEdit(p:Product){
//     this.router.navigateByUrl("/editProduct/"+p.id)
//   }

}
