import { redirect } from "next/navigation";
import { canAccessAdmin } from "@/features/rbac/services/access-control";
import { getAuthenticatedUser } from "@/lib/auth/session";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/login?next=%2Fadmin");
  if (!canAccessAdmin(user.role)) redirect("/");

  return <>{children}</>;
}
