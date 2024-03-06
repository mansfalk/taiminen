type BuildQueryParams = {
	type: string;
};

export function buildQuery(params: BuildQueryParams) {
	const { type } = params;
	const conditions = [`*[_type == "${type}" && _id == "page"]`];
	return `${conditions[0]}`;
}
