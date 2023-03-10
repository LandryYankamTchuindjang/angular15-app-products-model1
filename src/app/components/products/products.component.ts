import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { EventDriverSevice } from 'src/app/states/event.driver.service';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/states/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products$: Observable<AppDataState<Product[]>> | null=null;
  readonly DataStateEnum=DataStateEnum;

  constructor(private productService:ProductsService,private router:Router,
    private eventDrivenService:EventDriverSevice){}


  ngOnInit(): void {
    this.eventDrivenService.sourceEventSujectObservable.subscribe(
      (actionEvent:ActionEvent)=>{
        this.onActionEvent(actionEvent);
      });
  }

  onGetAllProducts(){
    this.products$=this.productService.getAllProducts().pipe(
      map(data=>{
        console.log(data);
        return({dataState:DataStateEnum.LOADED,data:data})}),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR,errorMessage:err.message}))
      );
  }

  onGetSelectedProducts(){
    this.products$=this.productService.getSelectedProducts().pipe(
      map(data=>{
        console.log(data);
        return({dataState:DataStateEnum.LOADED,data:data})}),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR,errorMessage:err.message}))
      );
  }

  onGetAvailableProducts(){
    this.products$=this.productService.getAvailableProducts().pipe(
      map(data=>{
        console.log(data);
        return({dataState:DataStateEnum.LOADED,data:data})}),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR,errorMessage:err.message}))
      );
  }

  onSearch(dataForm:any){
    this.products$=this.productService.searchProducts(dataForm.keyword).pipe(
      map(data=>{
        console.log(data);
        return({dataState:DataStateEnum.LOADED,data:data})}),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR,errorMessage:err.message}))
      );
  }

  onSelect(p:Product){
    this.productService.selectProducts(p)
      .subscribe(data => {p.selected=data.selected;});
  }

  onDelete(p:Product){
    let v=confirm("Voulez-vous vraiment supprimer?");
    if(v==true)
    this.productService.deleteProducts(p)
      .subscribe(data => {this.onGetAllProducts();});
  }

  onNewProduct(){
    console.log("bonjour")
    this.router.navigateByUrl("/newProduct")
  }

  onEdit(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id)
  }

  onActionEvent($event:ActionEvent){
    switch($event.type){
      case ProductActionsTypes.GET_ALL_PRODUCTS:this.onGetAllProducts();break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS:this.onGetSelectedProducts();break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:this.onGetAvailableProducts();break;
      case ProductActionsTypes.SEARCH_PRODUCTS:this.onSearch($event.payload);break;
      case ProductActionsTypes.NEW_PRODUCT:this.onNewProduct();break;
      case ProductActionsTypes.SELECT_PRODUCT:this.onSelect($event.payload);break;
      case ProductActionsTypes.DELETE_PRODUCT:this.onDelete($event.payload);break;
      case ProductActionsTypes.EDIT_PRODUCT:this.onEdit($event.payload);break;
    }

  }

}
