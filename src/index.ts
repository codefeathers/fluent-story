import { createElement as h, useState } from "react";
import type { FC, ComponentClass } from "react";
import { css } from "@emotion/css";

const headerHeight = 50;

const wrapper = css`
	background-color: #1f1f1f;
	height: 100vh;
	display: flex;
`;

const sideBar = css`
	width: 400px;
	height: 100%;
	border-right: 1px solid #303030;
	padding: 1rem;
	overflow-y: auto;
`;

const content = css`
	height: 100%;
	flex: 1;
`;

const header = css`
	height: ${headerHeight}px;
	border-bottom: 1px solid #303030;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const main = css`
	height: calc(100vh - ${headerHeight}px);
	overflow-y: auto;
	padding: 1.5rem;
	background-color: #080808;
`;

const btn = css`
	background-color: transparent;
	color: var(--white-2);
	padding: 0;
	margin-bottom: 1rem;
	display: block;
	border: none;
	cursor: pointer;
`;

const Stories: FC<{
	stories: Record<string, FC | ComponentClass>;
	title?: string;
}> = ({ stories, title = "Fluent Story" }) => {
	const [story, setStory] = useState<string | null>(null);

	const path = window.location.pathname;

	const compName = [
		...new URLSearchParams(window.location.search).entries(),
	].find(([query]) => query === "component")?.[1];

	const Component = compName && stories[compName];

	if (compName) return Component ? h(Component) : h("Component not found");

	return h(
		"div",
		{ className: wrapper },
		h(
			"div",
			{ className: sideBar },
			Object.keys(stories).map((key, idx) =>
				h(
					"button",
					{
						key: idx,
						className: btn,
						onClick: () => setStory(key),
					},
					key,
				),
			),
		),
		h(
			"div",
			{ className: content },
			h("header", { className: header }, compName || title),
			h(
				"main",
				{ className: main },
				story
					? h("iframe", { src: `${path}?component=${story}` })
					: "Select a component",
			),
		),
	);
};

export default Stories;
