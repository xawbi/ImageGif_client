'use client'
import { FC, useEffect, useState } from "react";
import { getUser } from "@/api/user";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { banUser, updateUserRole } from "@/api/admin";
import { UserDTO } from "@/api/dto/user.dto";

interface columnsProps {
  user: UserDTO
}

export const DropdownMenuComponent: FC<columnsProps> = ({ user }) => {
  const [meId, setMeId] = useState(0)
  const [isLoading, setIsLoading] = useState(true);

  const getMeFunc = async () => {
    const data = await getUser()
    setMeId(data.id)
  }

  useEffect(() => {
    getMeFunc()
    setIsLoading(false);
  }, [])

  return (
    <>
      {!isLoading && meId !== user.id && <>
        <DropdownMenuItem className={`cursor-pointer ${!user.ban && "text-red-500"}`}
                          onClick={async () => await banUser([user.id])}>{user.ban ? "Unban user" : "Ban user"}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await updateUserRole(user.id, user.role === "user" ? "admin" : "user");
          }}
          className="cursor-pointer"
        >
          {user.role === "user" ? "Make admin" : "Make user"}
        </DropdownMenuItem>
      </>}
    </>
  );
};