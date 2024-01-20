export const urls = {
  moduleDetails: (id: number, subRoute?: "notes" | "files") =>
    `/modules/${id}/${subRoute ?? "notes"}`,
  groupDetails: (id: number, subRoute?: "members" | "files") =>
    `/groups/${id}/${subRoute ?? "members"}`,
  questionsDetails: (id: number) => `/groups/${id}/questions/${id}`,
};
