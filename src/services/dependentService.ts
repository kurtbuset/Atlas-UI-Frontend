import { Dependent } from "../models";
import { mockDependents } from "../data";

// Abstract interface for dependent service
interface IDependentService {
  getBySubscriberId(subscriberId: string): Promise<Dependent[]>;
  getById(id: string): Promise<Dependent | null>;
  create(data: Omit<Dependent, "id">): Promise<Dependent>;
  update(id: string, data: Omit<Dependent, "id">): Promise<void>;
  delete(id: string): Promise<void>;
}

// Fake implementation using mock data
class FakeDependentService implements IDependentService {
  private dependents: Record<string, Dependent[]>;

  constructor() {
    // Clone mock data to avoid mutations
    this.dependents = JSON.parse(JSON.stringify(mockDependents));
  }

  async getBySubscriberId(subscriberId: string): Promise<Dependent[]> {
    await this.simulateNetworkDelay(200);
    return this.dependents[subscriberId] || [];
  }

  async getById(id: string): Promise<Dependent | null> {
    await this.simulateNetworkDelay(200);
    for (const subscriberId in this.dependents) {
      const dependent = this.dependents[subscriberId].find((d) => d.id === id);
      if (dependent) return dependent;
    }
    return null;
  }

  async create(data: Omit<Dependent, "id">): Promise<Dependent> {
    await this.simulateNetworkDelay(400);
    const newDependent: Dependent = {
      id: `dep-${Date.now()}`,
      ...data,
    };
    
    // Find the subscriber's member ID from the data
    const subscriberId = data.memberId.split("-")[0]; // Assuming format like "subscriberId-dependentId"
    
    if (!this.dependents[subscriberId]) {
      this.dependents[subscriberId] = [];
    }
    
    this.dependents[subscriberId].push(newDependent);
    return newDependent;
  }

  async update(id: string, data: Omit<Dependent, "id">): Promise<void> {
    await this.simulateNetworkDelay(400);
    for (const subscriberId in this.dependents) {
      const index = this.dependents[subscriberId].findIndex((d) => d.id === id);
      if (index !== -1) {
        this.dependents[subscriberId][index] = { id, ...data };
        return;
      }
    }
    throw new Error(`Dependent with id ${id} not found`);
  }

  async delete(id: string): Promise<void> {
    await this.simulateNetworkDelay(300);
    for (const subscriberId in this.dependents) {
      const index = this.dependents[subscriberId].findIndex((d) => d.id === id);
      if (index !== -1) {
        this.dependents[subscriberId].splice(index, 1);
        return;
      }
    }
    throw new Error(`Dependent with id ${id} not found`);
  }

  private simulateNetworkDelay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Real API implementation (for production)
class RealDependentService implements IDependentService {
  private baseURL = "/api/dependents";

  async getBySubscriberId(subscriberId: string): Promise<Dependent[]> {
    const response = await fetch(`${this.baseURL}/subscriber/${subscriberId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async getById(id: string): Promise<Dependent | null> {
    const response = await fetch(`${this.baseURL}/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async create(data: Omit<Dependent, "id">): Promise<Dependent> {
    const response = await fetch(this.baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async update(id: string, data: Omit<Dependent, "id">): Promise<void> {
    const response = await fetch(`${this.baseURL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
}

// Switch based on environment variable
const USE_FAKE_BACKEND = import.meta.env.VITE_USE_FAKE_BACKEND !== "false";

export const dependentService: IDependentService = USE_FAKE_BACKEND
  ? new FakeDependentService()
  : new RealDependentService();
