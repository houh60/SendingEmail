import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { KindAndNum } from '../shared/kindAndNum';
import { Picture } from '../shared/picture';

@Injectable({
    providedIn: 'root'
})
export class ShoppingService {

    items: Picture[] = [
        { id: 1, pictureName: 'Davy Jones', image: '../../../assets/pictures/Davy Jones.jpg', price: 10 },
        { id: 2, pictureName: 'Elizabeth Swann', image: '../../../assets/pictures/Elizabeth Swann.jpg', price: 20 },
        { id: 3, pictureName: 'Governor Swann', image: '../../../assets/pictures/Governor Swann.jpg', price: 10 },
        { id: 4, pictureName: 'Hector Barbossa', image: '../../../assets/pictures/Hector Barbossa.jpg', price: 30 },
        { id: 5, pictureName: 'Jack Sparrow', image: '../../../assets/pictures/Jack Sparrow.jpg', price: 100 },
        { id: 6, pictureName: 'Joshamee Gibbs', image: '../../../assets/pictures/Joshamee Gibbs.jpg', price: 10 },
        { id: 7, pictureName: 'Pintel', image: '../../../assets/pictures/Pintel.jpg', price: 10 },
        { id: 8, pictureName: 'Ragetti', image: '../../../assets/pictures/Ragetti.jpg', price: 10 },
        { id: 9, pictureName: 'Tia Dalma', image: '../../../assets/pictures/Tia Dalma.jpg', price: 20 },
        { id: 10, pictureName: 'William Turner', image: '../../../assets/pictures/William Turner.jpg', price: 50 }
    ];

    cartItemChanged = new Subject<Picture[]>();
    kindAndNumChanged = new Subject<KindAndNum[]>();

    cartItems: Picture[] = [];
    numKindSet = new Set<Picture>();
    kindAndNum: KindAndNum[] = [];

    total: number = 0;

    constructor() {}

    getItems() {
        return this.items;
    }

    getItem(index: number) {
        return this.items[index];
    }

    addPictureToCart(picture: Picture) {
        this.numKindSet.add(picture);
        this.cartItems.push(picture);
        this.cartItemChanged.next(this.cartItems);
        this.calEach();
        this.updateAll();
    }

    calEach() {
        this.kindAndNum = [];
        for(let picture of this.numKindSet) {
            const num = this.cartItems.filter(pic => pic.id === picture.id).length;
            const picAndNum = { picture, num };
            this.kindAndNum.push(picAndNum);
        }
    }

    getItemsAddedToCart() {
        return this.cartItems;
    }

    getKindAndNum() {
        return this.kindAndNum;
    }

    getTotal() {
        this.total = 0;
        for(let cartItem of this.cartItems) {
            this.total += cartItem.price;
        }
        return this.total;
    }

    delete(item: KindAndNum) {
        this.numKindSet.forEach(
            itm => {
                if(itm.id === item.picture.id) {
                    this.numKindSet.delete(itm);
                }
            }
        );
        this.kindAndNum = this.kindAndNum.filter(itm => itm.picture.id !== item.picture.id);
        this.cartItems = this.cartItems.filter(itm => itm.id !== item.picture.id);
        this.updateAll();
    }

    update(item: KindAndNum, num: number) {
        this.cartItems = this.cartItems.filter(itm => itm.id !== item.picture.id);
        let times = 0;
        while(times < num) {
            this.cartItems.push(item.picture);
            times++;
        }
        this.calEach();
        this.updateAll();
    }

    updateAll() {
        this.kindAndNumChanged.next(this.kindAndNum);
        this.cartItemChanged.next(this.cartItems);
    }
}
