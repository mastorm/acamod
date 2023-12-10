export const urls = {
  moduleDetails: (id: number, subRoute?: "notes" | "files") =>
    `/modules/${id}/${subRoute ?? "notes"}`,
  groupDetails: (id: number) => `/group/${id}`,
};
