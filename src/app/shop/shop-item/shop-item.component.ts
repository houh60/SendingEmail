import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    cartItemNum: number = 0

    constructor(
        private route: ActivatedRoute,
        private shoppingService: ShoppingService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.cartItemNum = this.shoppingService.getItemsAddedToCart().length;
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
            this.picture = this.shoppingService.getItem(this.id);
        });
        this.shoppingService.cartItemChanged.subscribe(cartItem => {
            this.cartItemNum = cartItem.length;
        });
    }

    addToCart() {
        this.shoppingService.addPictureToCart(this.picture);
    }

    checkout() {
        this.router.navigate(['/cart']);
    }

}
