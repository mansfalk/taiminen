/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...index]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import schema from "./sanity/schemas";
import { structure } from "./sanity/structure";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletons: Record<string, string> = {
	page: "Page",
};

export default defineConfig({
	basePath: "/studio",
	projectId,
	dataset,
	// Add and edit the content schema in the './sanity/schema' folder
	schema: {
		types: schema,
		templates: (templates) =>
			templates.filter(
				(template) => !Object.keys(singletons).includes(template.id)
			),
	},
	document: {
		actions: (prev, context) => {
			return Object.keys(singletons).includes(context.schemaType)
				? prev.filter(
						(action) =>
							action.action && singletonActions.has(action.action)
				  )
				: prev;
		},
	},
	plugins: [
		structureTool({
			structure: (S) => structure(S, singletons),
		}),
		// Vision is a tool that lets you query your content with GROQ in the studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
	],
});
