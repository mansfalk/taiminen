import Image from "next/image";
import header from "../public/kotisivutausta.jpg";

export const Header = () => {
	return (
		<header className="h-screen">
			<Image
				src={header}
				placeholder="blur"
				quality={100}
				alt="header"
				fill
				sizes="100vw"
				style={{ objectFit: "cover" }}
			/>
		</header>
	);
};
