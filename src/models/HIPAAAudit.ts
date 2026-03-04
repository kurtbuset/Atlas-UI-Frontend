// HIPAA Audit Log model
export interface HIPAAAuditLog {
  id: string;
  memberId: string;
  memberName: string;
  verificationType: string;
  identifiers: string[];
  providerName?: string;
  providerNPI?: string;
  providerTIN?: string;
  verifiedAt: string;
  agentUser?: string;
  ipAddress?: string;
  success: boolean;
}

// HIPAA Verification Data (session-based)
export interface VerificationData {
  verificationType: string;
  identifiers: string[];
  providerName?: string;
  providerNPI?: string;
  providerTIN?: string;
  verifiedAt: string;
}
