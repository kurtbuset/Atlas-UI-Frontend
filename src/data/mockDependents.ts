import { Dependent } from "../models/Dependent";

// Mock dependents data - keyed by subscriber member ID
export const mockDependents: Record<string, Dependent[]> = {
  "1772612329859": [
    {
      id: "dep-1",
      name: "Jane Doe",
      relationship: "Spouse",
      dateOfBirth: "08/15/1980",
      memberId: "1002567890",
      status: "Active",
    },
    {
      id: "dep-2",
      name: "Billy Doe",
      relationship: "Child",
      dateOfBirth: "03/22/2012",
      memberId: "1003876543",
      status: "Active",
    },
  ],
  "2": [
    {
      id: "dep-3",
      name: "John Johnson",
      relationship: "Spouse",
      dateOfBirth: "05/10/1985",
      memberId: "1002567891",
      status: "Active",
    },
  ],
  "3": [], // No dependents
};
