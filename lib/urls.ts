export const urls = {
  moduleDetails: (id: number, subRoute?: "notes" | "files") =>
    `/modules/${id}/${subRoute ?? "notes"}`,
  groupDetails: (id: number, subRoute?: "members" | "files" | "modules") =>
    `/groups/${id}/${subRoute ?? "modules"}`,
  questionsDetails: (groupId: number, questionId: number) =>
    `/groups/${groupId}/questions/${questionId}`,
  dashboard: () => "/dashboard",
};
