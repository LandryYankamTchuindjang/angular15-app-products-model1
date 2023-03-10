import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { EventDriverSevice } from 'src/app/states/event.driver.service';
import { ProductActionsTypes } from 'src/app/states/product.state';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup?:FormGroup;
  submitted:boolean=false;

  constructor(private fb:FormBuilder, private productsService:ProductsService,
    private eventDrivenSevice:EventDriverSevice
    ){}

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      name:["",Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required]
    })
  }

  onSaveProduct(){
    this.submitted=true;
    if(this.productFormGroup?.invalid) return;
    let v=confirm("Voulez-vous vraiment enregistrer ces donnees?");
    if(v==true)
    this.productsService.saveProduct(this.productFormGroup?.value).subscribe(
      data=>{this.eventDrivenSevice.publishEvent({type:ProductActionsTypes.PRODUCT_ADDED})});
  }

}
