import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shop/shopping.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    cartItemNum: number = 0
    constructor(
        private shoppingService: ShoppingService
    ) {}

    ngOnInit(): void {
        this.shoppingService.cartItemChanged.subscribe(cartItem => {
            this.cartItemNum = cartItem.length;
        });

    }
}
