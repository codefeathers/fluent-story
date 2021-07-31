import React, { FC } from "react";
import { css } from "@emotion/css";
import Input from "./Input";

const zoomWrapper = css`
	display: flex;
	align-items: center;
	font-size: 0.9rem;
	color: #63b3ed;

	& input {
		width: 3rem;
		text-align: right;

		&:focus {
			color: #63b3ed;
			border: 1px solid transparent;
		}
	}
`;

const Resizer: FC<{ zoom: number; setZoom: (zoom: number) => void }> = ({
	zoom,
	setZoom,
}) => {
	return (
		<div className={zoomWrapper}>
			<Input
				type={"number"}
				min={"10"}
				max={"200"}
				value={zoom}
				onChange={e => setZoom(parseFloat(e.target.value))}
			/>
			%
		</div>
	);
};

export default Resizer;
