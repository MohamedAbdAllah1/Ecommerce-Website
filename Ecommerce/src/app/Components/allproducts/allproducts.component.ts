import { Component } from '@angular/core';
import { data } from '../../modules/data'; 
import { IProduct } from '../../interface/productinterface';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent {
  allproducts = data; 
  filteredProducts = this.allproducts; 

  searchQuery: string = ''; 
  selectedCategory: string = 'All'; 

  filterProducts(searchQuery: string) {
    this.searchQuery = searchQuery;

    this.filteredProducts = this.allproducts.filter(product => 
      (
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.price.toString().includes(searchQuery)
      ) &&
      (this.selectedCategory === 'All' || product.category === this.selectedCategory)
    );
  }

  
  onCategoryChange(category: string) {
    this.selectedCategory = category; 
    this.filterProducts(this.searchQuery); 
  }
}
