import { ModuleDetailsPageProps } from "@/app/(authenticated)/modules/[moduleId]/routeParams";

export default async function ModuleNotes({
  params: { moduleId },
}: ModuleDetailsPageProps) {
  return <h1>Files</h1>;
}
