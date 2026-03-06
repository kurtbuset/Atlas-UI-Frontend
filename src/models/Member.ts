import { BaseEntity } from "../services/fakeBackend";

export interface Member extends BaseEntity {
  // Identity Info
  subscriberMemberId?: string;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  birthdate: string;
  sex: string;
  ssn: string;
  phoneNumber: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Policy Info
  accountGroupName: string;
  groupNumber: string;
  planName: string;
  planId: string;
  cobra: boolean;
  
  // Coverage Info
  coverageEffectiveDate: string;
  coverageTermDate: string;
  coverageTier: string;
  relationshipType: string;
  memberStatus: string; // Auto-set to "Active" on creation
  
  // Household UI
  policyholderName?: string;
  policyholderMemberId?: string;
  policyholderRelationship?: string;
  policyholderDOB?: string;
}
