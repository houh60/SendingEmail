import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Picture } from 'src/app/shared/picture';
import { ShoppingService } from '../shopping.service';

@Component({
    selector: 'app-shop-item',
    templateUrl: './shop-item.component.html',
    styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit {

    picture!: Picture;
    id!: number;

    constructor(
        private route: ActivatedRoute,
        private shoppingService: ShoppingService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
            this.picture = this.shoppingService.getItem(this.id);
        });
    }

    addToCart() {
        this.shoppingService.addPictureToCart(this.picture);
    }

}
