export interface ProductItem {

  id:number;

  name:string;

  price:number;

  description:string;

}

export interface ProductResponse {

  data: {

    items: ProductItem[];
    total: number;
    page: number;
    limit: number;
    pages: number;

  };

}