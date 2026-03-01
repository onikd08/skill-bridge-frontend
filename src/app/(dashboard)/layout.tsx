import { getUser } from "@/actions/auth/auth.action";
import AppSidebar from "@/components/layout/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  admin,
  tutor,
  student,
}: {
  admin: React.ReactNode;
  tutor: React.ReactNode;
  student: React.ReactNode;
}) {
  const userInfo = await getUser();

  if (!userInfo) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <h1>{userInfo.role} Dashboard</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === Roles.ADMIN
            ? admin
            : userInfo.role === Roles.TUTOR
              ? tutor
              : student}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
