import { z } from "zod";

export const UploadMediaSchema = z
  .object({
    name: z.string(),
    url: z.string(),
  })
  .openapi({
    example: {
      name: "My Image Name.png",
      url: "https://firebasestorage.googleapis.com/v0/b/charcookery.appspot.com/o/images%My%20Image%20Name.png",
    },
  });
