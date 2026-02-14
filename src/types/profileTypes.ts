export type ContactInfoKeys = "fullName" | "phone" | "homePhone" | "address" | "email";

export type PersonalDataKeys = "gender" | "birth" | "id" | "nationality" | "materialStatus" | "emergencyContact";

export type InsuranceInfoKeys = "memberId" | "provider";


export interface HeaderData {
  imageSource: string,
  fullName: string,
  department: string,
}

export interface KeyValueRow {
    key: string,
    value: string | number,
}