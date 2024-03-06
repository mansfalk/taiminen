import { groq } from "next-sanity";
import { readClient } from "./lib/client";
import { buildQuery } from "./utils";
import { Page } from "../types";

export const getPage = async (): Promise<Page | null> => {
	try {
		const query = groq`${buildQuery({
			type: "page",
		})} {
			title,
			"logo": logo.asset->url,
			"navItems": navitems[]{
				text,
				type,
				url,
				blank,
				"section": section->{
					id
				}
			},
			sections[]->{
				_id,
				id,
				title,
				type,
				text
			},
		}`;
		const page = await readClient.fetch<Page[]>(query);

		if (!page || page.length !== 1) {
			throw new Error("Page not found");
		}

		return page[0];
	} catch (error) {
		console.error(error);
		return null;
	}
};
