import { HIPAAAuditLog } from "../models";

// Abstract interface for HIPAA audit service
interface IHIPAAAuditService {
  getAll(): Promise<HIPAAAuditLog[]>;
  log(auditData: Omit<HIPAAAuditLog, "id">): Promise<void>;
  getByMemberId(memberId: string): Promise<HIPAAAuditLog[]>;
  getByDateRange(startDate: Date, endDate: Date): Promise<HIPAAAuditLog[]>;
  clearAll(): Promise<void>;
}

// Fake implementation using localStorage
class FakeHIPAAAuditService implements IHIPAAAuditService {
  private storageKey = "hipaa_audit_logs";

  async getAll(): Promise<HIPAAAuditLog[]> {
    await this.simulateNetworkDelay(200);
    const logs = localStorage.getItem(this.storageKey);
    return logs ? JSON.parse(logs) : [];
  }

  async log(auditData: Omit<HIPAAAuditLog, "id">): Promise<void> {
    await this.simulateNetworkDelay(300);
    const logs = await this.getAll();
    const newLog: HIPAAAuditLog = {
      id: Date.now().toString(),
      ...auditData,
    };
    logs.push(newLog);
    localStorage.setItem(this.storageKey, JSON.stringify(logs));
    
    // Log to console for development
    console.log("HIPAA Audit Log:", newLog);
  }

  async getByMemberId(memberId: string): Promise<HIPAAAuditLog[]> {
    const logs = await this.getAll();
    return logs.filter((log) => log.memberId === memberId);
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<HIPAAAuditLog[]> {
    const logs = await this.getAll();
    return logs.filter((log) => {
      const logDate = new Date(log.verifiedAt);
      return logDate >= startDate && logDate <= endDate;
    });
  }

  async clearAll(): Promise<void> {
    await this.simulateNetworkDelay(200);
    localStorage.removeItem(this.storageKey);
  }

  private simulateNetworkDelay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Real API implementation (for production)
class RealHIPAAAuditService implements IHIPAAAuditService {
  private baseURL = "/api/hipaa-audit";

  async getAll(): Promise<HIPAAAuditLog[]> {
    const response = await fetch(this.baseURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async log(auditData: Omit<HIPAAAuditLog, "id">): Promise<void> {
    const response = await fetch(this.baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(auditData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  async getByMemberId(memberId: string): Promise<HIPAAAuditLog[]> {
    const response = await fetch(`${this.baseURL}/member/${memberId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<HIPAAAuditLog[]> {
    const params = new URLSearchParams({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
    const response = await fetch(`${this.baseURL}/date-range?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async clearAll(): Promise<void> {
    const response = await fetch(this.baseURL, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
}

// Switch based on environment variable
const USE_FAKE_BACKEND = import.meta.env.VITE_USE_FAKE_BACKEND !== "false";

export const hipaaAuditService: IHIPAAAuditService = USE_FAKE_BACKEND
  ? new FakeHIPAAAuditService()
  : new RealHIPAAAuditService();
