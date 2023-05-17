export class Product {
  _id?: number;
  name: string;
  category: string;
  price: number;
  details: string;

  constructor(name: string, category: string, price: number, details: string) {
    this.name = name;
    this.category = category;
    this.price = price;
    this.details = details;
  }
}
