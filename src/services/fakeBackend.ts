// Centralized fake backend service using localStorage
// This can be used for any data type with CRUD operations

export interface BaseEntity {
  id: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class FakeBackend<T extends BaseEntity> {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  // Get all items from localStorage
  private getItems(): T[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Save items to localStorage
  private saveItems(items: T[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  // Initialize with seed data if storage is empty
  public seed(seedData: T[]): void {
    const existing = this.getItems();
    if (existing.length === 0) {
      this.saveItems(seedData);
    }
  }

  // Get all records
  async getAll(): Promise<T[]> {
    await delay(300);
    return this.getItems();
  }

  // Get single record by ID
  async getById(id: string): Promise<T | undefined> {
    await delay(200);
    const items = this.getItems();
    return items.find((item) => item.id === id);
  }

  // Create new record
  async create(data: Omit<T, "id">): Promise<T> {
    await delay(300);
    const items = this.getItems();
    const newItem: T = {
      ...data,
      id: Date.now().toString(),
    } as T;
    items.push(newItem);
    this.saveItems(items);
    return newItem;
  }

  // Update existing record
  async update(id: string, data: Partial<T>): Promise<T | null> {
    await delay(300);
    const items = this.getItems();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return null;

    items[index] = { ...items[index], ...data };
    this.saveItems(items);
    return items[index];
  }

  // Delete record
  async delete(id: string): Promise<boolean> {
    await delay(300);
    const items = this.getItems();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return false;

    items.splice(index, 1);
    this.saveItems(items);
    return true;
  }

  // Clear all data (useful for testing)
  clear(): void {
    localStorage.removeItem(this.storageKey);
  }

  // Get count of records
  async count(): Promise<number> {
    await delay(100);
    return this.getItems().length;
  }

  // Search/filter records
  async search(predicate: (item: T) => boolean): Promise<T[]> {
    await delay(200);
    const items = this.getItems();
    return items.filter(predicate);
  }
}
