import { Component, OnInit } from '@angular/core';
import { KindAndNum } from '../shared/kindAndNum';
import { Picture } from '../shared/picture';
import { ShoppingService } from '../shop/shopping.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    cartItms: Picture[] = [];
    kindNum: KindAndNum[] = [];
    total: number = 0;

    constructor(
        private shoppingService: ShoppingService
    ) {}

    ngOnInit(): void {
        this.kindNum = this.shoppingService.getKindAndNum();
        this.updateAll();
        this.total = this.shoppingService.getTotal();
    }

    onDelete(item: KindAndNum) {
        this.shoppingService.delete(item);
        this.total = this.shoppingService.getTotal();
    }

    onUpdate(item: KindAndNum, index: number) {
        const newNum = +(<HTMLInputElement>document.getElementById('' + index)).value;
        this.shoppingService.update(item, newNum);
        this.total = this.shoppingService.getTotal();
    }

    updateAll() {
        this.shoppingService.cartItemChanged.subscribe(cIs => this.cartItms = cIs);
        this.shoppingService.kindAndNumChanged.subscribe(kn => this.kindNum = kn);
    }
}
