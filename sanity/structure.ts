import { ListBuilder, StructureBuilder } from "sanity/structure";

export const structure = (
	S: StructureBuilder,
	singletons: Record<string, string>
): ListBuilder => {
	const generateSignletons = (S: StructureBuilder) => {
		return Object.keys(singletons).map((singleton) =>
			S.documentListItem()
				.title(singletons[singleton])
				.id(singleton)
				.schemaType(singleton)
		);
	};

	return S.list()
		.title("Content")
		.items([
			...generateSignletons(S),
			S.divider(),
			...S.documentTypeListItems().filter((item) => {
				const id = item.getId();
				return !Object.keys(singletons).includes(id ?? "");
			}),
		]);
};
