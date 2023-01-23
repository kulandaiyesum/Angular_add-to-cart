import { CartService } from './../../service/cart.service';
import { ApiService } from './../../service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList : any;
  public filterCategory : any;
  searchKey : string = "";
  constructor(private api : ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.api.getProduct().subscribe(data => {
      this.productList = data;
      this.filterCategory = data;
      this.productList.forEach((a: any) => {
        if (
          a.category === "women's clothing" ||
          a.category === "men's clothing"
        ) {
          a.category = "fashion";
        }
          Object.assign(a, { quantity: 1, total: a.price });
      });
      console.log(this.productList);
      
    })

    this.cartService.search.subscribe((val:any) => {
      this.searchKey = val;
    })
  }

  addtoCart(item : any){
    this.cartService.addtoCart(item);
  }

  filter(category : any) {
    this.filterCategory = this.productList.filter((a:any) => {
      if(a.category === category || category==''){
        return a;
      }
    })
  }
}
