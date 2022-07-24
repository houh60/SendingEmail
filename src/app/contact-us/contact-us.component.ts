import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { KindAndNum } from '../shared/kindAndNum';
import { ShoppingService } from '../shop/shopping.service';



@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {


    serviceID = 'service_7jmeevb';
    templateID = 'template_koqt8sd';
    publicKey = 'AsIKZyHHsL3996ON6';

    sendFromEmail = 'williamhou38@yahoo.com';
    sendToEmail = 'houh602students.rowan.edu@gmail.com';
    sendFromName = 'William';

    kindAndNum: KindAndNum[] = [];

    constructor(
        private shoppingService: ShoppingService
    ) {}

    ngOnInit(): void {
        this.kindAndNum = this.shoppingService.getKindAndNum();
        this.shoppingService.kindAndNumChanged.subscribe(kn => this.kindAndNum = kn);
    }

    public sendEmail(e: Event) {

        (<HTMLInputElement>document.getElementById("to_email")).value = this.sendToEmail;
        (<HTMLInputElement>document.getElementById("email_id")).value = this.sendFromEmail;
        (<HTMLInputElement>document.getElementById("from_name")).value = this.sendFromName;
        let val = '';
        this.kindAndNum.forEach(kn => {
            val += kn.picture.pictureName + '; Price: $' + kn.picture.price + '; Qty: ' + kn.num + ' || '
        });
        val += 'Total: $' + this.shoppingService.getTotal();
        (<HTMLTextAreaElement>document.getElementById("message")).value = val;
        emailjs
            .sendForm(this.serviceID, this.templateID, e.target as HTMLFormElement, this.publicKey)
            .then(() => {
                alert('Sent!');
            }, (err) => {
                alert(JSON.stringify(err));
            });
    }

}
