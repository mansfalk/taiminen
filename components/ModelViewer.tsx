"use client";

import React, { useRef, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { FBXLoader, STLLoader } from "three-stdlib";
import {
	OrbitControls,
	TransformControls,
	useHelper,
	useTexture,
} from "@react-three/drei";
import {
	AmbientLight,
	CanvasTexture,
	Color,
	DirectionalLight,
	DirectionalLightHelper,
	Mesh,
	MeshStandardMaterial,
	RepeatWrapping,
} from "three";
import { useControls } from "leva";
import { GradientPicker } from "@/components/ui/GradientPicker";

function Lights() {
	const ambientRef = useRef<AmbientLight>(null!);
	const directionalRef = useRef<DirectionalLight>(null!);

	useHelper(directionalRef, DirectionalLightHelper, 1, "blue");

	useControls("Ambient Light", {
		visible: {
			value: true,
			onChange: (v) => {
				ambientRef.current!.visible = v;
			},
		},
		color: {
			value: "white",
			onChange: (v) => {
				ambientRef.current!.color = new Color(v);
			},
		},
		intensity: {
			value: 1,
			onChange: (v) => {
				ambientRef.current!.intensity = v;
			},
		},
	});

	useControls("Directional Light", {
		visible: {
			value: true,
			onChange: (v) => {
				directionalRef.current!.visible = v;
			},
		},
		intensity: {
			value: 3,
			onChange: (v) => {
				directionalRef.current!.intensity = v;
			},
		},
		position: {
			value: { x: 1, y: 3, z: 1.3 },
			onChange: (v) => {
				directionalRef.current!.position.copy(v);
			},
		},
		color: {
			value: "white",
			onChange: (v) => {
				directionalRef.current!.color = new Color(v);
			},
		},
	});

	return (
		<>
			<ambientLight ref={ambientRef} />
			<directionalLight ref={directionalRef} />
		</>
	);
}

const FBXModel = ({ colors }: { colors: string[] }) => {
	const model = useLoader(FBXLoader, "./CubesFixedOrigin.fbx");
	const texture = useTexture("./green.png");

	const createGradientCanvas = (colors: string[]): HTMLCanvasElement => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		if (ctx) {
			const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
			const step = 1 / (colors.length - 1);

			colors.forEach((color, index) => {
				gradient.addColorStop(index * step, color);
			});

			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}

		return canvas;
	};

	model.traverse((child) => {
		if (child instanceof Mesh) {
			child.scale.set(0.5, 0.5, 0.5);
			child.position.set(0, 0, 0);

			if (colors.length === 1) {
				child.material = new MeshStandardMaterial({
					color: colors[0],
				});
			} else if (colors.length > 1) {
				const gradientTexture = new CanvasTexture(
					createGradientCanvas(colors),
				);
				gradientTexture.wrapS = gradientTexture.wrapT = RepeatWrapping;

				child.material = new MeshStandardMaterial({
					map: gradientTexture,
				});
			}

			// if (child.name === "2") {
			//     texture.wrapS = texture.wrapT = RepeatWrapping;
			//     texture.repeat.set(4, 4);
			//     child.material.map = texture;
			//     child.material.vertexColors = null;
			// }
		}
	});

	return (
		<>
			<primitive object={model} />
		</>
	);
};

// const Model = () => {
// 	const geometry = useLoader(STLLoader, "./scrapper.stl");
// 	const texture = useTexture("./green.png");
//
// 	// Assuming the model has a bounding box
// 	geometry.computeBoundingBox();
//
// 	return (
// 		<>
// 			<mesh
// 				castShadow
// 				geometry={geometry}
// 				scale={0.05}
// 				position={[0, 0, 0]}
// 				rotation={[300, 0, 0]}
// 			>
// 				<meshStandardMaterial map={texture} />
// 			</mesh>
// 		</>
// 	);
// };

const Scene = ({ colors }: { colors: string[] }) => {
	return (
		<Canvas camera={{ position: [4, 4, 1.5] }}>
			<Lights />
			{/*<Model/>*/}
			<FBXModel colors={colors} />

			{/* helpers */}
			<OrbitControls zoomSpeed={10} />
			<axesHelper args={[5]} />
			<gridHelper />
			<TransformControls />
		</Canvas>
	);
};

export const ModelViewer = () => {
	const [colors, setColors] = useState<string[]>([""]);

	return (
		<div className={"flex gap-x-4 h-[700px]"}>
			<div className={"w-full max-w-[350px] bg-gray-200 p-4"}>
				<GradientPicker colors={colors} setColors={setColors} />
			</div>
			<Scene colors={colors} />
		</div>
	);
};
