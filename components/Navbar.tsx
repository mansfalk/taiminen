"use client";
import Image from "next/image";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";
import { NavItem } from "../types";

export const Navbar = ({
	logo,
	navItems,
}: {
	logo: string;
	navItems: NavItem[];
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<>
			<nav className="w-full h-16 flex items-center fixed bg-primary-foreground z-10">
				<div className="container flex justify-between">
					<a href="/">
						<Image alt="logo" src={logo} width="160" height="40" />
					</a>
					<Button
						className="lg:hidden"
						variant="ghost"
						style={{ marginRight: "-1rem" }}
						onClick={() => setIsExpanded(!isExpanded)}
					>
						<Image
							alt="expand navbar"
							src="/bars-solid.svg"
							width="25"
							height="25"
						/>
					</Button>
					<ul
						className={twMerge(
							`
						px-8 absolute w-full left-0 top-full bg-secondary text-secondary-foreground
						lg:px-0 lg:relative lg:w-auto lg:auto lg:bg-transparent lg:flex lg:gap-x-6`,
							isExpanded ? "block" : "hidden"
						)}
					>
						{navItems.map((item) => {
							if (item.type === "link") {
								return (
									<li key={item.url} className="flex">
										<a
											className="flex items-center py-4 lg:py-0"
											href={item.url}
										>
											{item.text}
										</a>
									</li>
								);
							}

							return (
								<li key={item.section.id} className="flex">
									<a
										className="flex items-center py-4 lg:py-0"
										href={`#${item.section.id}`}
									>
										{item.text}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			</nav>
		</>
	);
};
