import { Component, OnInit, OnDestroy } from '@angular/core'
import { ProductsService } from './products.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {
  isDisabled = true
  products = []
  private productsSubscription: Subscription

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.isDisabled = false
    this.products = this.productsService.getProducts()
    this.productsSubscription = this.productsService.productsUpdated.subscribe(() => {
      this.products = this.productsService.getProducts()
    })
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe()
  }

  onAddProduct(form) {
    if (form.valid) {
      this.productsService.addProduct(form.value.productName)
    }
  }

  onRemoveProduct(productName: string) {
    this.productsService.deleteProduct(productName)
  }
}
