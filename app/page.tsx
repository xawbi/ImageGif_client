import { FileDTO } from "@/api/dto/file.dto";
import { getPublicFiles } from "@/api/public";
import { UserDTO } from "@/api/dto/user.dto";
import { getUser } from "@/api/user";
import PublicFiles from "@/components/public/PublicFiles";
import MasonryClient from "@/components/MasonryClient";
import Link from "next/link";
import { HandleLink, SetScroll } from "@/components/public/ScrollComponents";
import React from "react";

export default async function Home() {

  const filesPublic: FileDTO[] = await getPublicFiles();
  const user: UserDTO = await getUser();

  return (
    <>
      <div className="pt-5">
        <MasonryClient>
          {filesPublic && filesPublic.map((file) =>
            <PublicFiles key={file.id} file={file} user={user} />
          )}
        </MasonryClient>
      </div>
    </>
  );
}
