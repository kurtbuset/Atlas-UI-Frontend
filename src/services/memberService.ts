import { FakeBackend } from "./fakeBackend";
import { Member } from "../models";

// Seed data for members
const seedMembers: Member[] = [
  {
    id: "1",
    firstName: "Jacob",
    lastName: "Smith",
    middleInitial: "M",
    sex: "Male",
    birthdate: "1994-08-21",
    ssn: "***-**-9872",
    phoneNumber: "(555) 123-4567",
    email: "jacob.smith@email.com",
    addressLine1: "123 Main St",
    city: "Lebanon",
    state: "MO",
    zipCode: "65536",
    accountGroupName: "Acme Corporation",
    groupNumber: "GRP-12345",
    planName: "Premium Health Plan",
    planId: "PLAN-001",
    cobra: false,
    coverageEffectiveDate: "2024-01-01",
    coverageTermDate: "2024-12-31",
    coverageTier: "Family",
    relationshipType: "Subscriber",
    memberStatus: "Active",
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    sex: "Female",
    birthdate: "1988-03-15",
    ssn: "***-**-1234",
    phoneNumber: "(555) 234-5678",
    email: "sarah.johnson@email.com",
    addressLine1: "456 Oak Ave",
    city: "Springfield",
    state: "MO",
    zipCode: "65802",
    accountGroupName: "Tech Solutions Inc",
    groupNumber: "GRP-67890",
    planName: "Standard Health Plan",
    planId: "PLAN-002",
    cobra: false,
    coverageEffectiveDate: "2024-02-01",
    coverageTermDate: "2024-12-31",
    coverageTier: "Single",
    relationshipType: "Subscriber",
    memberStatus: "Active",
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Brown",
    sex: "Male",
    birthdate: "1992-11-30",
    ssn: "***-**-5678",
    phoneNumber: "(555) 345-6789",
    email: "michael.brown@email.com",
    addressLine1: "789 Pine Rd",
    city: "Columbia",
    state: "MO",
    zipCode: "65201",
    accountGroupName: "Global Industries",
    groupNumber: "GRP-11111",
    planName: "Basic Health Plan",
    planId: "PLAN-003",
    cobra: true,
    coverageEffectiveDate: "2023-06-01",
    coverageTermDate: "2024-05-31",
    coverageTier: "Single",
    relationshipType: "Subscriber",
    memberStatus: "Terminated",
  },
];

// Abstract interface for member service
interface IMemberService {
  getAll(): Promise<Member[]>;
  getById(id: string): Promise<Member | null>;
  create(data: Omit<Member, "id">): Promise<Member>;
  update(id: string, data: Omit<Member, "id">): Promise<void>;
  delete(id: string): Promise<void>;
}

// Fake implementation using FakeBackend
class FakeMemberService implements IMemberService {
  private backend: FakeBackend<Member>;

  constructor() {
    this.backend = new FakeBackend<Member>("members");
    this.backend.seed(seedMembers);
  }

  async getAll(): Promise<Member[]> {
    await this.simulateNetworkDelay(300);
    return this.backend.getAll();
  }

  async getById(id: string): Promise<Member | null> {
    await this.simulateNetworkDelay(200);
    const result = await this.backend.getById(id);
    return result ?? null;
  }

  async create(data: Omit<Member, "id">): Promise<Member> {
    await this.simulateNetworkDelay(400);
    return this.backend.create(data);
  }

  async update(id: string, data: Omit<Member, "id">): Promise<void> {
    await this.simulateNetworkDelay(400);
    this.backend.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.simulateNetworkDelay(300);
    this.backend.delete(id);
  }

  private simulateNetworkDelay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Real API implementation (for production)
class RealMemberService implements IMemberService {
  private baseURL = "/api/members";

  async getAll(): Promise<Member[]> {
    const response = await fetch(this.baseURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async getById(id: string): Promise<Member | null> {
    const response = await fetch(`${this.baseURL}/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async create(data: Omit<Member, "id">): Promise<Member> {
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

  async update(id: string, data: Omit<Member, "id">): Promise<void> {
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
// Default to fake backend if not specified
const USE_FAKE_BACKEND = import.meta.env.VITE_USE_FAKE_BACKEND !== "false";

export const memberService: IMemberService = USE_FAKE_BACKEND
  ? new FakeMemberService()
  : new RealMemberService();

// Re-export Member type for backward compatibility
export type { Member };
