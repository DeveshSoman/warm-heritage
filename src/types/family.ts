
export type OccupationType = 'Salaried' | 'Business' | 'Housewife' | 'Retired';

export interface Person {
  name: string;
  dob: Date | null;
  occupation: string;
  phoneNumber: string;
}

export interface FamilyHead extends Person {}

export interface Spouse extends Person {
  numberOfGrandchildren: number;
}

export interface Child extends Person {
  additionalPhoneNumbers: string[];
  maritalStatus: 'Married' | 'Unmarried';
  spouse?: Spouse;
  children: Grandchild[];
}

export interface Grandchild extends Person {}

export interface FamilyData {
  familyHead: FamilyHead;
  children: Child[];
}
