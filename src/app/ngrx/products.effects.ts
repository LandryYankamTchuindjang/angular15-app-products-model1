import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { catchError } from "rxjs/internal/operators/catchError";
import { map, mergeMap } from "rxjs/operators";
import { ProductService } from "../services/products.service";
import { DeleteProductActionError, DeleteProductActionSuccess, EditProductActionError, EditProductActionSuccess, GetAllProductsActionError, GetAllProductsActionSuccess, GetSelectedProductsActionError, GetSelectedProductsActionSuccess, NewProductActionSuccess, ProductsActions, ProductsActionsTypes, SaveProductActionError, SaveProductActionSuccess, SearchProductsActionError, SearchProductsActionSuccess, SelectProductActionError, SelectProductActionSuccess, UpdateProductActionError, UpdateProductActionSuccess } from "./products.actions";

@Injectable()
export class ProductsEffets{
  constructor(private productsService:ProductService,private effectActions:Actions){
  }

  //Get all products
  getAllProductsEffet:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_ALL_PRODUCTS),
      mergeMap((action:ProductsActions)=>{
        return this.productsService.getProducts().pipe(
          map((products)=>new GetAllProductsActionSuccess(products)),
          catchError((err)=>of(new GetAllProductsActionError(err.message)))
        )
      })
    )
  );
  //Get selected products
  getSelectedProductsEffet:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_SELECTED_PRODUCTS),
      mergeMap((action:ProductsActions)=>{
        return this.productsService.getSelectedProducts().pipe(
          map((products)=>new GetSelectedProductsActionSuccess(products)),
          catchError((err)=>of(new GetSelectedProductsActionError(err.message)))
        )
      })
    )
  );

  //Search products Effect
 SearchProductsEffet:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.SEARCH_PRODUCTS),
      mergeMap((action:ProductsActions)=>{
        return this.productsService.searchProducts(action.payload).pipe(
          map((products)=>new SearchProductsActionSuccess(products)),
          catchError((err)=>of(new SearchProductsActionError(err.message)))
        )
      })
    )
  );

  //Select product effect
  selectProductEffet:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.SELECT_PRODUCT),
      mergeMap((action:ProductsActions)=>{
        return this.productsService.setSelected(action.payload).pipe(
          map((product)=>new SelectProductActionSuccess(product)),
          catchError((err)=>of(new SelectProductActionError(err.message)))
        )
      })
    )
  );

  //Delete product effect
  deleteProductEffet:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.DELETE_PRODUCT),
      mergeMap((action:ProductsActions)=>{
        return this.productsService.delete(action.payload.id).pipe(
          map(()=>new DeleteProductActionSuccess(action.payload)),
          catchError((err)=>of(new DeleteProductActionError(err.message)))
        )
      })
    )
  );

  //New product effect
  newProductEffet:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.NEW_PRODUCT),
      map((action:ProductsActions)=>{
        return  new NewProductActionSuccess({});
      })
    )
  );

  //Save product effect
  saveProductEffet:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.SAVE_PRODUCT),
      mergeMap((action:ProductsActions)=>{
        return this.productsService.save(action.payload).pipe(
          map((product)=>new SaveProductActionSuccess(product)),
          catchError((err)=>of(new SaveProductActionError(err.message)))
        )
      })
    )
  );

  //Edit product effect
  editProductEffet:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.EDIT_PRODUCT),
      mergeMap((action:ProductsActions)=>{
        return this.productsService.getProductById(action.payload).pipe(
          map((product)=>new EditProductActionSuccess(product)),
          catchError((err)=>of(new EditProductActionError(err.message)))
        )
      })
    )
  );

  //Update product effect
  updateProductEffet:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.UPDATE_PRODUCT),
      mergeMap((action:ProductsActions)=>{
        return this.productsService.update(action.payload).pipe(
          map((product)=>new UpdateProductActionSuccess(product)),
          catchError((err)=>of(new UpdateProductActionError(err.message)))
        )
      })
    )
  );


}
