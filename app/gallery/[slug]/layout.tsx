import { ReactNode } from "react";
import ButtonNext from "@/app/gallery/[slug]/buttonNext";
import { FileDTO } from "@/api/dto/file.dto";
import { getPublicFiles } from "@/api/public";

interface BlogLayoutProps {
  children: ReactNode;
  params: {
    slug: string;
  };
}

export default async function blogLayout({ children, params: { slug } }: BlogLayoutProps) {

  const files: FileDTO[] = await getPublicFiles();
  const currentPostIndex = files.findIndex((file) => String(file.id) === slug)
  const nextFile = files[(+currentPostIndex + 1) % files.length]
  const prevFile = files[(+currentPostIndex - 1 + files.length) % files.length]

  return <>
    <div className="flex items-center justify-between py-3 px-1">
      <div className="flex items-center">
        <p className="mr-2 text-2xl font-medium">Collapse from England</p>
      </div>
      <div className="flex items-center">
        <ButtonNext files={files} nextFile={nextFile} prevFile={prevFile} />
      </div>
    </div>
    {children}
  </>
}