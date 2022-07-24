import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
    { path: '', redirectTo: '/pictures', pathMatch: 'full' },
    {
        path: 'pictures', component: ShopComponent, children: [
            { path: ':id', component: ShopItemComponent }
        ]
    },
    { path: 'cart', component: CartComponent, children: [
        { path: ':id', component: CartComponent }
    ] },
    { path: '**', redirectTo: '/pictures', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
