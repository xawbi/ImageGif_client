"use client";
import { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const AdminLayout: FC = () => {
  const pathName = usePathname();
  const navItems = [
    { label: "POSTS", href: "/admin" },
    { label: "USERS", href: "/admin/users" }
  ];

  return (
    <>
      <ul className="flex rounded-b-2xl justify-center flex-wrap">
      {navItems.map((link) => {
          const isActive = pathName === link.href;
          return (
            <li key={link.label} className="mt-2">
              <Link
                href={link.href}
                className={`text-xs min-[500px]:text-sm text-white ${isActive ? "border-b-2 border-white" : ""} hover:text-gray-200 p-3 rounded-sm`}
              >
                {link.label}
              </Link>
            </li>
          );
        }
      )}
      </ul>
    </>
  );
};

export default AdminLayout;