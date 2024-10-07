import { Component } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(private authService: AuthService) {
    this.loadCartItems();
  }

  loadCartItems() {
    const username = this.authService.getCurrentUsername();
    this.cartItems = JSON.parse(localStorage.getItem(`cart_${username}`) || '[]');
    this.calculateTotal();
  }

  increaseQuantity(product: any) {
    product.quantity = (product.quantity || 1) + 1;
    this.updateCart();
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity -= 1;
      this.updateCart();
    }
  }

  removeItem(product: any) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.updateCart();
  }

  clearCart() {
    this.cartItems = [];
    const username = this.authService.getCurrentUsername();
    localStorage.removeItem(`cart_${username}`);
    this.calculateTotal();
  }

  updateCart() {
    const username = this.authService.getCurrentUsername();
    localStorage.setItem(`cart_${username}`,JSON.stringify(this.cartItems));
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  }
}
