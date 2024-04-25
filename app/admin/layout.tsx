import { ReactNode } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

export default async function adminLayout({children}: {
  children: ReactNode
}) {
  return (
    <>
      <AdminLayout/>
      {children}
    </>
  )
}