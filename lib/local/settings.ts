import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "settings.json");

export interface SiteSettings {
  phone: string;
  whatsapp: string;
  instagram: string;
  cta_contact_text: string;
  cta_call_text: string;
}

const DEFAULTS: SiteSettings = {
  phone: "+973 36414730",
  whatsapp: "97336414730",
  instagram: "https://instagram.com/3mcars.bh",
  cta_contact_text: "تواصل معنا",
  cta_call_text: "اتصال مباشر",
};

export function readSettings(): SiteSettings {
  try {
    return { ...DEFAULTS, ...JSON.parse(fs.readFileSync(FILE, "utf-8")) };
  } catch {
    return { ...DEFAULTS };
  }
}

export function writeSettings(data: SiteSettings): void {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}
