export type Page = {
	title: string;
	logo: string;
	navItems: NavItem[];
	sections: SectionModel<SectionTextModel | SectionListModel>[];
};

export type NavItem = {
	text: string;
} & (NavItemLink | NavItemSection);

type NavItemLink = {
	type: "link";
	url: string;
	blank: boolean;
};

type NavItemSection = { type: "section"; section: { id: string } };

export type SectionModel<T extends SectionTextModel | SectionListModel> = {
	_id: string;
	id: string;
	title: string;
} & T;

export type SectionTextModel = {
	type: "text";
	text: "string";
};

export type SectionListModel = {
	type: "list";
};
