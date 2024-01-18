export const urls = {
  moduleDetails: (id: number, subRoute?: "notes" | "files") =>
    `/modules/${id}/${subRoute ?? "notes"}`,
  groupDetails: (id: number) => `/groups/${id}`,
  questionsDetails: (id: number) => `/groups/${id}/questions/${id}`,
};
