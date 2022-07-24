import { Component, OnInit } from '@angular/core';
import { Picture } from 'src/app/shared/picture';
import { ShoppingService } from './shopping.service';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

    items: Picture[] = [];

    constructor(private shoppingService: ShoppingService) {}

    ngOnInit(): void {
        this.items = this.shoppingService.getItems();
    }

}
