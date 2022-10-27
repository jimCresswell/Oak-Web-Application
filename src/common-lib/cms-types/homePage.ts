import * as z from "zod";

import { formDefinitionSchema } from "../../../hubspot-forms/FormDefinition";

import { documentSchema, seoSchema } from "./base";
import { cardSchema } from "./blocks";
import { portableTextSchema } from "./portableText";

export const homePageSchema = z
  .object({
    heading: z.string(),
    summaryPortableText: portableTextSchema,
    sidebarCard1: cardSchema,
    sidebarCard2: cardSchema,
    sidebarForm: z
      .object({
        title: z.string(),
        bodyPortableText: portableTextSchema,
        hubspotForm: formDefinitionSchema,
      })
      .passthrough(),
    seo: seoSchema.nullish(),
  })
  .merge(documentSchema);

export type HomePage = z.infer<typeof homePageSchema>;
