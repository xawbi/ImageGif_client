import { checkAdmin, checkBan } from "@/api/checkVerify";
import { notFound, redirect } from "next/navigation";
import { getUsers } from "@/api/admin";
import { UserDTO } from "@/api/dto/user.dto";
import { columns } from "@/app/admin/users/colums";
import { DataTable } from "@/app/admin/users/data-table";

export default async function Admin() {
  if (!await checkAdmin()) notFound()
  if (await checkBan()) redirect('/ban')

  const users: UserDTO[] = await getUsers()

  return (
    <>
      <section className='py-16 px-1 lg:px-20 xl:px-40'>
          <DataTable columns={columns} data={users} />
      </section>
    </>
  )
}