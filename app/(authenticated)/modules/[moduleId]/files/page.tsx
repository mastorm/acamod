import { ModuleDetailsPageProps } from "@/app/(authenticated)/modules/[moduleId]/routeParams";

export default async function ModuleNotes({
  params: { moduleId },
}: ModuleDetailsPageProps) {
  return (
    <main>
      <h1>Files</h1>
    </main>
  );
}
