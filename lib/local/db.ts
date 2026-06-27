import fs from "fs";
import path from "path";
import type { Car } from "@/lib/supabase/types";

const FILE = path.join(process.cwd(), "data", "cars.json");

function read(): Car[] {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

function write(cars: Car[]) {
  fs.writeFileSync(FILE, JSON.stringify(cars, null, 2));
}

export const localDb = {
  cars: {
    getAll(): Car[] {
      return read().sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    },

    getById(id: string): Car | null {
      return read().find((c) => c.id === id) ?? null;
    },

    insert(data: Omit<Car, "id" | "created_at" | "updated_at">): Car {
      const cars = read();
      const now = new Date().toISOString();
      const car: Car = {
        ...data,
        id: crypto.randomUUID(),
        created_at: now,
        updated_at: now,
      };
      cars.push(car);
      write(cars);
      return car;
    },

    update(id: string, data: Partial<Car>): Car | null {
      const cars = read();
      const idx = cars.findIndex((c) => c.id === id);
      if (idx === -1) return null;
      cars[idx] = { ...cars[idx], ...data, updated_at: new Date().toISOString() };
      write(cars);
      return cars[idx];
    },

    delete(id: string): boolean {
      const cars = read();
      const filtered = cars.filter((c) => c.id !== id);
      if (filtered.length === cars.length) return false;
      write(filtered);
      return true;
    },
  },
};
