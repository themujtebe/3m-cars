export type CarStatus = "available" | "sold";
export type Currency = "BHD" | "SAR" | "AED" | "KWD" | "OMR" | "QAR";

export interface Car {
  id: string;
  title_ar: string;
  title_en: string | null;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  currency: Currency;
  description_ar: string | null;
  description_en: string | null;
  status: CarStatus;
  featured: boolean;
  images: string[];
  whatsapp_number: string;
  created_at: string;
  updated_at: string;
}

export type CarInsert = Omit<Car, "id" | "created_at" | "updated_at">;
export type CarUpdate = Partial<CarInsert>;

export interface Database {
  public: {
    Tables: {
      cars: {
        Row: Car;
        Insert: CarInsert;
        Update: CarUpdate;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      car_status: CarStatus;
      currency: Currency;
    };
  };
}
