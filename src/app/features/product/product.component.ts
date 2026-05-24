import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import {
  ProductItem,
  ProductResponse
} from '../../core/models/product.model';

import { ProductService } from '../../core/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: ProductItem[] = [];

  filteredProducts: ProductItem[] = [];

  paginatedProducts: ProductItem[] = [];

  productForm!: FormGroup;

  searchText = '';

  currentPage = 1;

  itemsPerPage = 10;

  totalPages = 1;

  showModal = false;

  isEditMode = false;

  editProductId!: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.initializeForm();

    this.getProducts();

  }

  initializeForm(): void {

    this.productForm = this.fb.group({

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      price: [
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      description: ['']

    });

  }

  getProducts(): void {

    this.productService
      .getProduct(
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe({

        next: (response: ProductResponse) => {

          this.products =
            response.data.items || [];
          this.totalPages =
            response.data.pages || 1;
            
          this.filterProducts();

        },

        error: (err) => {

          console.error(err);

          this.products = [];

          this.filterProducts();

        }

      });

  }

  filterProducts(): void {

    this.filteredProducts =
      this.products.filter(product =>

        product.name
          .toLowerCase()
          .includes(
            this.searchText
              .toLowerCase()
              .trim()
          )

      );

    this.updatePaginatedProducts();

  }

  updatePaginatedProducts(): void {

    this.paginatedProducts =
      this.filteredProducts;

  }

  searchProduct(): void {

    this.filterProducts();

  }

  nextPage(): void {

    this.currentPage++;

    this.getProducts();

  }

  prevPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.getProducts();

    }

  }

  openAddModal(): void {

    this.showModal = true;

    this.isEditMode = false;

    this.editProductId = 0;

    this.productForm.reset();

  }

  closeModal(): void {

    this.showModal = false;

    this.productForm.reset();

  }

  saveProduct(): void {

    const reqBody = {

      name:
        this.productForm.value.name,

      price:
        this.productForm.value.price,

      description:
        this.productForm.value.description

    };

    if (this.isEditMode) {


      this.productService.updateProduct(this.editProductId, reqBody).subscribe({

        next: (res: any) => {

          this.closeModal();
          this.toastr.success(res.message || 'Product updated successfully');

          this.getProducts();

        },
        error: (err) => {
          this.toastr.error(err.error?.error || 'Failed to update product');

        }

      });

    }
    else {


      this.productService.createProduct(reqBody).subscribe({

        next: (res: any) => {

          this.closeModal();
          this.toastr.success(res.message || 'Product created successfully');
          this.currentPage = 1;

          this.getProducts();

        },

        error: (err) => {

          this.toastr.error(err.error?.error || 'Failed to create product');

        }

      });

    }

  }

  editProduct(product: ProductItem): void {

    this.showModal = true;

    this.isEditMode = true;

    this.editProductId = product.id;

    this.productForm.patchValue({

      name:
        product.name,

      price:
        product.price,

      description:
        product.description

    });

  }

  deleteProduct(
    id: number
  ): void {

    this.productService
      .deleteProduct(id)
      .subscribe({

        next: () => {

          this.getProducts();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

}