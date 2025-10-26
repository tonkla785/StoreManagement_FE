import { Routes } from '@angular/router';
import { Product } from './product/product';
import { Bill } from './bill/bill';
import { Dashboard } from './dashboard/dashboard';
import { Editproduct } from './editproduct/editproduct';
import { Createproduct } from './createproduct/createproduct';
import { Billdetail } from './billdetail/billdetail';
import { Editbill } from './editbill/editbill';
import { Createbill } from './createbill/createbill';

export const routes: Routes = [{
  path: '',
  redirectTo: 'product',
  pathMatch: 'full'
},
{
  path: "product",
  component: Product
},
{
  path: "createproduct",
  component: Createproduct
},
{
  path: 'edit/:id',
  component: Editproduct
},
{
  path: "bill",
  component: Bill
},
{
  path: "billdetail/:id",
  component: Billdetail
},
{
  path: "editbill/:id",
  component: Editbill
},
{
  path: "createbill",
  component: Createbill
},
{
  path: "dashboard",
  component: Dashboard
}
];
