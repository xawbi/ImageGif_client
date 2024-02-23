import { ReactNode } from "react";
import ButtonNext from "@/app/gallery/[slug]/buttonNext";
import { FileDTO } from "@/api/dto/file.dto";
import { getPublicFiles, updateView } from "@/api/public";
import { cookies } from "next/headers";
import UpdateViewsButton from "@/components/public/UpdateViewsButton";

interface BlogLayoutProps {
  children: ReactNode
  params: {
    slug: string
  }
}

export default async function blogLayout({ children, params: { slug } }: BlogLayoutProps) {
  const selectedSortCookie = cookies().get("selectedSortPublic")?.value
  const files: FileDTO[] = await getPublicFiles('', selectedSortCookie)
  const currentFileId = files.findIndex((file) => file.id === +slug)

  return <>
    <div className="flex items-center justify-between py-3 px-1 break-words">
      <div className="flex-grow items-center overflow-hidden">
        <p className="mr-2 text-xl sm:text-2xl font-medium whitespace-pre-line">{files[currentFileId].postName}</p>
      </div>
      <div className="flex items-center">
        <ButtonNext files={files} fileId={+slug} />
      </div>
    </div>
    {children}
  </>
}