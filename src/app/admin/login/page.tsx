import { LoginForm } from "@/components/admin/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50/50">
      <div className="w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary">AVP Oils & Millets</h1>
          <p className="text-muted-foreground mt-2">Admin Control Panel</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
