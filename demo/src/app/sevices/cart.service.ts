import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "../models/product.inteface";

@Injectable({
    providedIn: 'root'
})

export class CartService {
    cartValue = new BehaviorSubject<Product[]>([]);
    cartTotalCount = new BehaviorSubject<number>(0);
    getCartValue(): Observable<Product[]> {
        return this.cartValue.asObservable();
    }

    updateCartValue(product: Product[]): void {
        this.updateCartTotalCount(this.cartValue.value);
        this.cartValue.next(product);
    }

    getCartTotalCount(): Observable<number> {
        return this.cartTotalCount.asObservable();
    }

    updateCartTotalCount(cartArray: Product[]): void {
        this.cartTotalCount.next(this.getItemCount(cartArray));
    }

    getItemCount(cartArray: Product[]): number {
        let totalCount: number = 0;
        if (cartArray.length) {
            cartArray.forEach((item: Product) => {
                totalCount += item?.quantity ? item.quantity : 1;
            })
        }
        return totalCount;
    }

    getProductFinalPrice(qty: number, price: number): number {
        return qty * price;
    }

    incrementQty(index: number): void {
        const val: Product = this.cartValue.value[index]
        val['quantity'] = val?.quantity ? ++val.quantity : 1;
        val['totalPrice'] = this.getProductFinalPrice(
            val.quantity, val.price
        )
        this.cartValue.value[index] = val
        this.updateCartValue(this.cartValue.value);


    }

    decrementQty(index: number): void {
        const val: Product = this.cartValue.value[index]
        val['quantity'] = val?.quantity ? --val.quantity : 0;
        if (val['quantity'] == 0) {
            this.cartValue.value.splice(index, 1);
        } else {
            val['totalPrice'] = this.getProductFinalPrice(
                val.quantity, val.price
            )
            this.cartValue.value[index] = val
        }
        this.updateCartValue(this.cartValue.value);

    }

    getTotalCartPrice(): number {
        let sum: number = 0;
        this.cartValue.getValue().forEach((item: Product) => {
            sum += item?.totalPrice ? item?.totalPrice : item.price;
        })
        return sum;
    }

}