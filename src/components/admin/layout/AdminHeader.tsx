import { logoutAction } from "@/features/auth/actions";
import { LogOut, Bell } from "lucide-react";

export function AdminHeader({ user }: { user: any }) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shadow-sm flex-shrink-0">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-xs text-gray-400 font-medium">Welcome back,</p>
          <p className="text-sm font-semibold text-gray-800">{user?.name || "Admin"}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
          <Bell className="h-4 w-4 text-gray-500" />
        </button>

        <div className="w-px h-6 bg-gray-200" />

        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 px-4 py-2 rounded-xl transition-all duration-200"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}
