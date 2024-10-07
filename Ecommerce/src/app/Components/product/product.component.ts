import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../interface/productinterface';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  constructor(private route: Router, private authService: AuthService) {}

  @Input() ProductInput: IProduct = {
    id: 1,
    title: '',
    image: '',
    price: 100,
    description: '',
    brand: '',
    model: '',
    category: '',
    discount: 0,
    onSale: false,
    popular: false,
    color: ''
  };

  viewDetails() {
    console.log(this.ProductInput.id);
    this.route.navigate([`products/${this.ProductInput.id}`]);
  }

  addToCart() {
    const currentUser = this.authService.getCurrentUsername();
    if (currentUser) {

      const userCart = JSON.parse(localStorage.getItem(`cart_${currentUser}`) || '[]');
      const existingProduct = userCart.find((item: { id: number; }) => item.id === this.ProductInput.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        const productWithQuantity = { ...this.ProductInput, quantity: 1 };
        userCart.push(productWithQuantity);
      }


      localStorage.setItem(`cart_${currentUser}`, JSON.stringify(userCart));

      // Show confirmation message
      // alert(${this.ProductInput.title} has been added to your cart!);

      // Optionally navigate to the cart page
      // this.route.navigate(['/cart']);
    } else {
      alert('Please login or register first!');
      this.route.navigate(['/login']);
    }
  }

}
