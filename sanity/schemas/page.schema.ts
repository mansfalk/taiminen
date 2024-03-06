import { defineType } from "sanity";

export const page = defineType({
	name: "page",
	title: "Page",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "logo",
			title: "Logo",
			type: "image",
		},
		{
			name: "navitems",
			title: "Nav Items",
			type: "array",
			of: [
				{
					type: "object",
					name: "navitem",
					title: "Nav Item",
					fields: [
						{
							name: "text",
							title: "Text",
							type: "string",
						},
						{
							name: "type",
							title: "Type",
							type: "string",
							initialValue: "link",
							options: {
								layout: "radio",
								list: [
									{
										title: "Link",
										value: "link",
									},
									{
										title: "Section",
										value: "section",
									},
								],
							},
						},
						{
							name: "url",
							title: "URL",
							type: "string",
							hidden: ({ parent }) => (parent as any).type !== "link",
						},
						{
							name: "blank",
							title: "Open in new tab",
							type: "boolean",
							hidden: ({ parent }) => (parent as any).type !== "link",
						},
						{
							name: "section",
							title: "Section",
							type: "reference",
							to: [{ type: "section" }],
							hidden: ({ parent }) => (parent as any).type !== "section",
						},
					],
				},
			],
		},
		{
			name: "sections",
			title: "Sections",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "section" }],
				},
			],
		},
	],
});
