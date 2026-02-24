import { FakeBackend, BaseEntity } from "./fakeBackend";

export interface Member extends BaseEntity {
  firstName: string;
  lastName: string;
  sex: string;
  birthdate: string;
  memberId: string;
  ssn: string;
  memberStatus: string;
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
}

// Seed data for members
const seedMembers: Member[] = [
  {
    id: "1",
    firstName: "Jacob",
    lastName: "Smith",
    sex: "Male",
    birthdate: "1994-08-21",
    memberId: "D-21000945300",
    ssn: "***-**-9872",
    memberStatus: "Active",
    addressLine1: "123 Main St",
    city: "Lebanon",
    state: "MO",
    zipCode: "65536",
    email: "jacob.smith@email.com",
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    sex: "Female",
    birthdate: "1988-03-15",
    memberId: "D-21000945301",
    ssn: "***-**-1234",
    memberStatus: "Active",
    addressLine1: "456 Oak Ave",
    city: "Springfield",
    state: "MO",
    zipCode: "65802",
    email: "sarah.johnson@email.com",
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Brown",
    sex: "Male",
    birthdate: "1992-11-30",
    memberId: "D-21000945302",
    ssn: "***-**-5678",
    memberStatus: "Inactive",
    addressLine1: "789 Pine Rd",
    city: "Columbia",
    state: "MO",
    zipCode: "65201",
    email: "michael.brown@email.com",
  },
];

// Create member service instance
const backend = new FakeBackend<Member>("members");
backend.seed(seedMembers);

// Export the service
export const memberService = backend;
