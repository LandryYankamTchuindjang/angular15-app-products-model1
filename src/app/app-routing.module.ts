import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';
import { NewProductComponent } from './components/products/new-product/new-product.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {path:"products",component:ProductsComponent},
  {path:"newProduct",component:NewProductComponent},
  {path:"editProduct/:id",component:ProductEditComponent},
  {path:"",component:HomeComponent}
];

@NgModule({
  imports  : [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
