import * as z from "zod";

export const documentSchema = z.object({
  id: z.string(),
});

export const slugSchema = z
  .object({
    current: z.string().nonempty(),
  })
  .transform((slug) => slug.current);

export type Slug = z.infer<typeof slugSchema>;

// @TODO: Proper shape here
export const portableTextSchema = z.array(z.any());

export type PortableText = z.infer<typeof portableTextSchema>;

export const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date());