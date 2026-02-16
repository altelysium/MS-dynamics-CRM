export type ContactInfoKeys = "fullName" | "phone" | "homePhone" | "address" | "email";

export type PersonalDataKeys =
  | "gender"
  | "birth"
  | "id"
  | "nationality"
  | "materialStatus"
  | "emergencyContact";

export interface ActivitiesDataKeys {
  title: string;
  description: string;
  date: string;
} 

export type InsuranceInfoKeys = "memberId" | "provider";

export interface HeaderData {
  imageSource: string;
  fullName: string;
  department: string;
}

export interface KeyValueRow {
  key: string;
  value: string | number;
}

export interface ColumnProperties {
  field: string;
  header: string;
}

export type AppointmentsKeys = "date" | "speciality" | "status";

export type FeedbackKeys = "feedbackTitle" | "feedbackDate" | "feedbackStatus";

export type SurveysKeys = "title" | "completedOn";

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
}

export interface Review {
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
