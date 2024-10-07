import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Output() categoryChange = new EventEmitter<string>(); 

  categories = ["tv", "audio", "mobile", "gaming"]; 

  onCategoryChange(event: any) {
    const selectedCategory = event.target.value === 'All Categories' ? 'All' : event.target.value; 
    this.categoryChange.emit(selectedCategory); 
  }
}
