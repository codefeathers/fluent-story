import React, { FC } from "react";
import { css } from "@emotion/css";
import Accordion from "./Accordion";

const btn = css`
	width: 100%;
	background: #242424;
	color: #f8f8f8;
	padding: 0.8rem;
	margin-bottom: 1rem;
	display: block;
	border: none;
	cursor: pointer;
	font-size: 15px;
	font-weight: 500;

	&:hover {
		background: #2a2a2a;
	}
`;

export type Tree = Record<string, Tree | React.ReactElement>;

const ListRenderer: FC<{ list: Tree; setStory: (state: string) => void }> = ({
	list,
	setStory,
}) => {
	return (
		<>
			{Object.entries(list).map(([key, value]) => {
				return typeof value === "string" ? (
					<button key={key} className={btn} onClick={() => setStory(value)}>
						{key}
					</button>
				) : (
					<Accordion
						key={key}
						Header={<span>{key}</span>}
						Content={<ListRenderer list={value} setStory={setStory} />}
					/>
				);
			})}
		</>
	);
};

export default ListRenderer;
