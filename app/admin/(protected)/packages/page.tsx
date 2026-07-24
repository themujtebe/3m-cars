import { packagesDb } from "@/lib/local/packages";
import PackagesManager from "@/components/admin/PackagesManager";

export default function AdminPackagesPage() {
  const packages = packagesDb.getAll();
  return (
    <div className="mx-auto max-w-5xl">
      <PackagesManager packages={packages} />
    </div>
  );
}
