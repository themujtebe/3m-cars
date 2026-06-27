import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "packages.json");

export interface Package {
  id: string;
  name: string;
  price: number;
  features: string[];
  highlighted: boolean;
}

function read(): Package[] {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

function write(packages: Package[]) {
  fs.writeFileSync(FILE, JSON.stringify(packages, null, 2));
}

export const packagesDb = {
  getAll(): Package[] {
    return read();
  },

  getById(id: string): Package | null {
    return read().find((p) => p.id === id) ?? null;
  },

  insert(data: Omit<Package, "id">): Package {
    const pkgs = read();
    const pkg: Package = { ...data, id: `pkg-${Date.now()}` };
    pkgs.push(pkg);
    write(pkgs);
    return pkg;
  },

  update(id: string, data: Partial<Omit<Package, "id">>): Package | null {
    const pkgs = read();
    const idx = pkgs.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    pkgs[idx] = { ...pkgs[idx], ...data };
    write(pkgs);
    return pkgs[idx];
  },

  delete(id: string): boolean {
    const pkgs = read();
    const filtered = pkgs.filter((p) => p.id !== id);
    if (filtered.length === pkgs.length) return false;
    write(filtered);
    return true;
  },
};
