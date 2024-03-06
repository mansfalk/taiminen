import React from "react";
import { SectionModel, SectionTextModel } from "../../types";

type SectionTextProps = {
	section: SectionModel<SectionTextModel>;
};

export const SectionText = ({ section }: SectionTextProps) => {
	const { text } = section;
	return (
		<section id={section.id} className="container py-16 whitespace-pre-line">
			<div className="max-w-2xl mx-auto">{text}</div>
		</section>
	);
};
