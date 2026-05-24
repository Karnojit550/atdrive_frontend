import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

import { OrderService } from '../../core/services/order.service';

import { ProductService } from '../../core/services/product.service';

import { CommonModule } from '@angular/common';

import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];

  products: any[] = [];

  filteredProducts: any[] = [];

  selectedProducts: any[] = [];

  orderForm!: FormGroup;

  page = 1;

  limit = 10;

  totalPages = 1;

  totalRecords = 0;

  totalAmount = 0;

  loading = false;

  isEditMode = false;

  editId = '';

  showModal = false;

  searchText = '';

  status = true;
  dropdownOpen = false;




  constructor(private fb: FormBuilder, private orderService: OrderService, private productService: ProductService, private toast: ToastrService) { }

  ngOnInit(): void {

    this.initializeForm();

    this.loadOrders();

    this.loadProducts();

  }

  isSelected(product: any) {

    return this.selectedProducts
      .some(
        p => p.id === product.id
      );
  }

  toggleProduct(product: any) {

    const exists =
      this.selectedProducts
        .some(
          p => p.id === product.id
        );

    if (exists) {

      this.selectedProducts =
        this.selectedProducts
          .filter(
            p => p.id !== product.id
          );

    } else {

      this.selectedProducts.push(product);

    }

    this.onProductChange();

  }
  initializeForm() {

    this.orderForm =
      this.fb.group({

        productIds: [
          [],
          Validators.required
        ],

        totalAmount: [
          0
        ]

      });

  }

  loadOrders() {

    this.loading = true;

    this.orderService.getOrders(this.page, this.limit).subscribe({
      next: (res) => {

        this.orders = res.data.items;

        this.totalPages = res.data.pages;

        this.totalRecords = res.data.total;

        this.loading = false;

      }, error: (err) => {

        console.log(err);

        this.loading = false;

        this.toast.error(err?.error?.error || 'Failed to load orders');

      }

    });

  }

  loadProducts() {

    this.productService.getProduct(1, 100).subscribe({

      next: (res: any) => {

        this.products = res.data.items;

        this.filteredProducts = [...this.products];

      }, error: (err) => {
        this.toast.error(err?.error?.error || 'Failed to load products');

        console.log(err);
      }

    });

  }

  filterProducts() {

    if (!this.searchText) {

      this.filteredProducts = [...this.products];
      return;
    }

    this.filteredProducts =
      this.products.filter(
        product =>
          product.name.toLowerCase().includes(
            this.searchText.toLowerCase()
          )

      );

  }

  onProductChange() {

    this.totalAmount = 0;

    this.selectedProducts.forEach(product => {

      this.totalAmount += Number(product.price);

    });

    this.orderForm.patchValue({

      totalAmount: this.totalAmount

    });

  }

  openCreateModal() {

    this.showModal = true;

    this.isEditMode = false;

    this.editId = '';

    this.totalAmount = 0;

    this.selectedProducts = [];

    this.searchText = '';

    this.dropdownOpen = false;

  }

  openEditModal(order: any) {

    this.showModal = true;

    this.isEditMode = true;

    this.editId = order.id;

    this.selectedProducts =
      [...order.productIds];

    this.totalAmount =
      order.totalAmount;

    this.dropdownOpen = false;

  }

  closeModal() {

    this.showModal = false;

    this.orderForm.reset();

    this.selectedProducts = [];

    this.totalAmount = 0;

    this.searchText = '';

  }

  saveOrder() {

    if (this.selectedProducts.length === 0
    ) {

      this.toast.error('Select at least one product');

      return;
    }

    const payload = {
      productIds:

        this.selectedProducts.map(product => product.id),

      totalAmount: this.totalAmount
    };

    if (this.isEditMode) {

      this.updateOrder(payload);

    }
    else {

      this.createOrder(payload);

    }

  }

  createOrder(payload: any) {
    this.loading = true;
    this.orderService.createOrder(payload).subscribe({

      next: (res: any) => {
        this.loading = false;
        this.toast.success(res?.message || 'Order Created');

        this.closeModal();

        this.loadOrders();

      },

      error: (err) => {
        this.loading = false;
        this.toast.error(err?.error?.error || 'Failed to create order');

        console.log(err);

      }

    });

  }

  updateOrder(payload: any) {
    this.loading = true;
    this.orderService.updateOrder(this.editId, payload).subscribe({

      next: (res: any) => {
        this.loading = false;
        this.toast.success(res?.message || 'Order Updated');

        this.closeModal();

        this.loadOrders();

      },

      error: (err) => {
        this.loading = false;

        this.toast.error(err?.error?.error || 'Failed to update order');

        console.log(err);

      }

    });

  }

  statusChange(id: string) {

    const confirmDelete =

      confirm('Change Order Status ?');

    if (!confirmDelete) return;

    this.loading = true;

    this.orderService.statusChange(id).subscribe({

      next: (res: any) => {
        this.loading = false;

        this.toast.success(res?.message || 'Order Deleted');

        this.loadOrders();

      },

      error: (err) => {
        this.loading = false;
        this.toast.error(err?.error?.error || 'Failed to delete order');
        console.log(err);

      }

    });

  }

  nextPage() {
    if (this.page < this.totalPages) {

      this.page++;

      this.loadOrders();
    }

  }

  prevPage() {

    if (this.page > 1) {

      this.page--;

      this.loadOrders();

    }

  }

  getProductNames(products: any[]): string {

    if (!products?.length) {

      return 'No Products';

    }

    return products
      .map(product => product.name)
      .join(', ');

  }

}
