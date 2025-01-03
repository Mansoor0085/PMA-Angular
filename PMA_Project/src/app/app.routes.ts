import { Routes } from '@angular/router';
import { ProductCreateComponent } from './product-create/product-create.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', component: ProductCreateComponent },
];
