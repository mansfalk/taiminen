"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Paintbrush } from "lucide-react";
import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export function GradientPicker({
	colors,
	setColors,
	className,
}: {
	colors: string[];
	setColors: (color: string[]) => void;
	className?: string;
}) {
	const solids = [
		"#E2E2E2",
		"#ff75c3",
		"#ffa647",
		"#ffe83f",
		"#9fff5b",
		"#70e2ff",
		"#cd93ff",
		"#09203f",
	];

	const gradients: string[][] = [
		["#accbee", "#e7f0fd"],
		["#d5d4d0", "#d5d4d0", "#eeeeec"],
		["#000000", "#434343"],
		["#09203f", "#537895"],
		["#AC32E4", "#7918F2", "#4801FF"],
		["#f953c6", "#b91d73"],
		["#ee0979", "#ff6a00"],
		["#F00000", "#DC281E"],
		["#00c6ff", "#0072ff"],
		["#4facfe", "#00f2fe"],
		["#0ba360", "#3cba92"],
		["#FDFC47", "#24FE41"],
		["#8a2be2", "#0000cd", "#228b22", "#ccff00"],
		["#40E0D0", "#FF8C00", "#FF0080"],
		[
			"#fcc5e4",
			"#fda34b",
			"#ff7882",
			"#c8699e",
			"#7046aa",
			"#0c1db8",
			"#020f75",
		],
		["#ff75c3", "#ffa647", "#ffe83f", "#9fff5b", "#70e2ff", "#cd93ff"],
	];

	const values = useMemo<{
		color: string;
		tab: "image" | "gradient" | "solid";
	}>(() => {
		if (colors == null || colors.length === 0) {
			return {
				color: "",
				tab: "solid",
			};
		}
		if (colors.length === 1) {
			return {
				color: colors[0],
				tab: "solid",
			};
		}
		return {
			color: `linear-gradient(to top left, ${colors.join(",")})`,
			tab: "gradient",
		};
	}, [colors]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-full justify-start text-left font-normal",
						!values && "text-muted-foreground",
						className,
					)}
				>
					<div className="w-full flex items-center gap-2">
						{values.color ? (
							<div
								className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
								style={{ background: values.color }}
							></div>
						) : (
							<Paintbrush className="h-4 w-4" />
						)}
						<div className="truncate flex-1">
							{values.color ? values.color : "Pick a color"}
						</div>
					</div>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-64">
				<Tabs defaultValue={values.tab} className="w-full">
					<TabsList className="w-full mb-4">
						<TabsTrigger className="flex-1" value="solid">
							Solid
						</TabsTrigger>
						<TabsTrigger className="flex-1" value="gradient">
							Gradient
						</TabsTrigger>
					</TabsList>

					<TabsContent value="solid" className="flex flex-wrap gap-1 mt-0">
						{solids.map((s) => (
							<div
								key={s}
								style={{ background: s }}
								className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
								onClick={() => setColors([s])}
							/>
						))}
					</TabsContent>

					<TabsContent value="gradient" className="mt-0">
						<div className="flex flex-wrap gap-1 mb-2">
							{gradients.map((s) => {
								const colors = s.join(",");
								return (
									<div
										key={colors}
										style={{
											background: `linear-gradient(to top left, ${colors})`,
										}}
										className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
										onClick={() => setColors(s)}
									/>
								);
							})}
						</div>
					</TabsContent>
				</Tabs>

				<Input
					id="custom"
					value={colors}
					className="col-span-2 h-8 mt-4"
					onChange={(e) => {
						const value = e.currentTarget.value;
						setColors(value.split(",") ?? [""]);
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}
