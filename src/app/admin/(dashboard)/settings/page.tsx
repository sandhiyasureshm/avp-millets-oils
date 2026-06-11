import { prisma } from "@/lib/db";
import { SettingsForm } from "@/components/admin/forms/SettingsForm";

export default async function SettingsPage() {
  const settingsRecords = await prisma.homepageSetting.findMany();
  
  // Convert array to key-value object
  const settings = settingsRecords.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-500 mt-2">Manage basic contact information and WhatsApp details.</p>
      </div>

      <SettingsForm initialData={settings} />
    </div>
  );
}
