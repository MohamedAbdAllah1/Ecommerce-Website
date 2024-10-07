import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'src/app/modules/data';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  Productdetails: any = {
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


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.Productdetails = data.find(product => product.id === id);
  }

  addToCart() {
    const currentUser = this.authService.getCurrentUsername();
    if (currentUser) {

      const userCart = JSON.parse(localStorage.getItem(`cart_${currentUser}`) || '[]');
      const existingProduct = userCart.find((item: { id: number; }) => item.id === this.Productdetails.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        const productWithQuantity = { ...this.Productdetails, quantity: 1 };
        userCart.push(productWithQuantity);
      }


      localStorage.setItem(`cart_${currentUser}`, JSON.stringify(userCart));


      this.router.navigate(['/cart']);
    } else {
      alert('Please login or register first!');
      this.router.navigate(['/login']);
    }
  }
}
