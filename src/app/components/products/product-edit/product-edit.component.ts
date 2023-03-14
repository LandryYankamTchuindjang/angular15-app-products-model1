import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EditProductAction, UpdateProductAction } from 'src/app/ngrx/products.actions';
import { ProductsState, ProductsStateEnum } from 'src/app/ngrx/products.reducer';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{

  productID:number;
  state:ProductsState|null=null
  readonly ProductsStateEnum=ProductsStateEnum;
  productFormGroup:FormGroup|null=null;
  submitted:boolean=false;
  formBuilt:boolean=false;
  constructor(private activatedRoute:ActivatedRoute,
    private store:Store<any>,
    private fb:FormBuilder,private router:Router){
      this.productID=activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.store.dispatch(new EditProductAction(this.productID));
    this.store.subscribe(state=>{
      this.state=state.catalogState;
      if(this.state?.dataState==ProductsStateEnum.LOADED){
        if(this.state.currentProduct!=null){
          this.productFormGroup=this.fb.group({
            id:[this.state.currentProduct.id],
            name:[this.state.currentProduct.name,Validators.required],
            price:[this.state.currentProduct.price,Validators.required],
            quantity:[this.state.currentProduct.quantity,Validators.required],
            selected:[this.state.currentProduct.selected,Validators.required]
          });
          this.formBuilt=true
        }
      }
    })
  }

  okUpdated(){
    this.router.navigateByUrl("/products")
  }
  onUpdateProduct(){
    this.submitted=true;
    if(this.productFormGroup?.invalid) return;
    this.store.dispatch(new UpdateProductAction(this.productFormGroup?.value))

  //   this.productsService.udapteProduct(this.productFormGroup?.value).subscribe(
  //     data=>{alert("Success Product Updated");
  //   });
  }
}
