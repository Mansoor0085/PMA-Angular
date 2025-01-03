import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { Product } from '../product.model';
import { ProductServiceService } from '../product-service.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {
  products: Product[] = [];
  isAddProductVisible: boolean = false;
  @ViewChild('productModal') modal : ElementRef | undefined;
  product: Product = {id: 0, name: '', price: 0, quantity: 0 };
  isEdit: boolean = false;
  @ViewChild('productForm') productForm: any;

  constructor(private productService: ProductServiceService,private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProduct().subscribe({
      next: (data) => {
        this.products = data;
        console.log("P = "+ JSON.stringify(this.products))
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  openModal(mode: 'add' | 'edit', product?: Product): void {
    this.isEdit = mode === 'edit';
    this.product = product ? { ...product } : { id: 0, name: '', price: 0, quantity: 0 };
    const prodModal = document.getElementById('productModal');
    if(prodModal != null)
    {
      prodModal.style.display = 'block'
    }
  }

  closeModal(){
    const prodModal = document.getElementById('productModal');
    if(prodModal != null)
    {
      prodModal.style.display = 'none';
    }
  }

  saveProduct(): void {
    if (this.isEdit) {
      this.productService.updateProduct(this.product).subscribe(() => {
        alert('Product updated successfully');
        this.loadProducts();
        this.closeModal();
      });
    } else {
      this.productService.addProduct(this.product).subscribe(() => {
        alert('Product added successfully');
        this.loadProducts();
        this.closeModal();
      });
    }
  }
  
  
  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        alert('Product deleted successfully');
        this.loadProducts();
      });
    }
  }
}
