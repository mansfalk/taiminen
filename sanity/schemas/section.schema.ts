import { defineType } from "sanity";

export const section = defineType({
	name: "section",
	title: "Section",
	type: "document",
	preview: {
		select: {
			title: "id",
			subtitle: "title",
		},
	},
	fields: [
		{
			name: "id",
			title: "ID",
			type: "string",
		},
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "type",
			title: "Type",
			type: "string",
			initialValue: "text",
			options: {
				layout: "radio",
				list: [
					{
						title: "Text",
						value: "text",
					},
					{
						title: "List",
						value: "list",
					},
				],
			},
		},
		{
			name: "text",
			title: "Text",
			type: "text",
			hidden: ({ document }) => (document as any).type !== "text",
		},
		{
			name: "columns",
			title: "List Columns",
			type: "array",
			hidden: ({ document }) => (document as any).type !== "list",
			of: [
				{
					type: "object",
					name: "column",
					title: "Column",
					fields: [
						{
							name: "title",
							title: "Column Title",
							type: "string",
						},
						{
							name: "sections",
							title: "Sections",
							type: "array",
							of: [
								{
									type: "object",
									name: "section",
									title: "Section",
									preview: {
										select: {
											title: "row",
											subtitle: "title",
										},
										prepare(selection) {
											const { title, subtitle } = selection;
											return {
												title: title,
												subtitle: subtitle ? "Title" : "Row",
											};
										},
									},
									fields: [
										{
											name: "row",
											title: "Row",
											type: "string",
										},
										{
											name: "title",
											title: "Title",
											type: "boolean",
											initialValue: false,
										},
									],
								},
							],
						},
					],
				},
			],
		},
	],
});
