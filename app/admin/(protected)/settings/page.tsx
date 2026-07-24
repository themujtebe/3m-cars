import { readSettings } from "@/lib/local/settings";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = readSettings();
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <SettingsForm settings={settings} />
    </div>
  );
}
