import React, { FC, useRef } from "react";
import { css } from "@emotion/css";
import { Size, presets } from "./Size";
import Input from "./Input";

const select = css`
	background-color: transparent;
	border: none;
	padding: 0.5rem;
	width: 90px;
	text-overflow: ellipsis;
	color: #ffffff;
`;

const custom = css`
	display: flex;
	gap: 0.5rem;
	align-items: center;

	& input:first-of-type {
		text-align: right;
	}
`;

const Resizer: FC<{ size: Size; setSize: (size: Partial<Size>) => void }> = ({
	size,
	setSize,
}) => {
	const width = useRef<HTMLInputElement>(null);

	return (
		<>
			<select
				defaultValue="desktop"
				onChange={e => {
					const selected = e.target.value;
					if (selected === "custom") width.current?.focus();
					setSize(presets[selected]);
				}}
				className={select}>
				{Object.keys(presets).map(name => (
					<option key={name} value={name}>
						{name}
					</option>
				))}
				<option value={"custom"}>custom</option>
			</select>
			<div className={custom}>
				<Input
					value={parseFloat(size.width) || 1}
					ref={width}
					onChange={e =>
						setSize({ width: parseFloat(e.target.value) + "px" })
					}
				/>
				×
				<Input
					value={parseFloat(size.height) || 1}
					onChange={e =>
						setSize({ height: parseFloat(e.target.value) + "px" })
					}
				/>
			</div>
		</>
	);
};

export default Resizer;
