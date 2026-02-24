// Example: How to create a new service using the centralized fake backend
// This file demonstrates how easy it is to add new entities

import { FakeBackend, BaseEntity } from "./fakeBackend";

// 1. Define your entity interface
export interface Product extends BaseEntity {
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

// 2. Create seed data (optional)
const seedProducts: Product[] = [
  {
    id: "1",
    name: "Laptop",
    price: 999.99,
    category: "Electronics",
    inStock: true,
  },
  {
    id: "2",
    name: "Mouse",
    price: 29.99,
    category: "Electronics",
    inStock: true,
  },
];

// 3. Initialize the service with a unique storage key
const backend = new FakeBackend<Product>("products");
backend.seed(seedProducts);

// 4. Export the service
export const productService = backend;

// That's it! You now have a fully functional CRUD service with:
// - productService.getAll()
// - productService.getById(id)
// - productService.create(data)
// - productService.update(id, data)
// - productService.delete(id)
// - productService.count()
// - productService.search(predicate)
