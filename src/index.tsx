import React, { useState, useReducer, useRef } from "react";
import type { FC, ComponentClass } from "react";
import { css } from "@emotion/css";
import { presets, Size } from "./Size";
import Resizer from "./Resizer";
import Zoom from "./Zoom";
import Logo from "./Logo";
import Search from "./Search";
import { filter } from "./util";

const headerHeight = 50;

const wrapper = css`
	background-color: #1f1f1f;
	height: 100vh;
	display: flex;
	text-align: left;
	color: #ffffff;

	&,
	& * {
		box-sizing: border-box;
		text-align: left;
	}
`;

const sideBar = css`
	width: 350px;
	height: 100%;
	border-right: 1px solid #303030;
	overflow-y: auto;
`;

const logo = css`
	height: 50px;
	padding: 1.4rem 0.8rem 0 0.8rem;
	width: 100%;
	& svg {
		height: 80%;
	}
	& svg * {
		fill: white;
	}
`;

const list = css`
	margin-top: 2rem;
	width: 100%;
`;

const content = css`
	height: 100%;
	width: calc(100vw - 400px);
	flex: 1;
`;

const header = css`
	height: ${headerHeight}px;
	border-bottom: 1px solid #303030;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-inline: 0.5rem;
`;

const main = css`
	height: calc(100% - ${headerHeight}px);
	overflow: auto;
	background-color: #080808;

	& div,
	& iframe {
		padding: 1.5rem;
		box-sizing: content-box;
	}
`;

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

const preview = css`
	width: 100%;
	height: 100%;
	border: none;
	transition: all 0.3s ease-in-out;
	transform-origin: top left;
`;

const noResult = css`
	margin: 0;
	padding: 0 1rem;
`;

const Stories: FC<{
	stories: Record<string, FC | ComponentClass>;
	title?: string;
}> = ({ stories, title = "Fluent Story" }) => {
	const [story, setStory] = useState<string | null>(null);
	const [filteredStories, setFilteredStories] = useState<string[] | null>(null);
	const [zoom, setZoom] = useState<number>(100);
	const [size, setSize] = useReducer(
		(state: Size, size: Partial<Size>) => ({ ...state, ...size }),
		{ ...presets.desktop },
	);

	const path = window.location.pathname;

	const compName = [
		...new URLSearchParams(window.location.search).entries(),
	].find(([query]) => query === "component")?.[1];

	const Component = compName && stories[compName];

	if (compName) return Component ? <Component /> : <>"Component not found"</>;

	const handleSearch = (key: string) => {
		console.log({ op: filter(Object.keys(stories), key) });
		setFilteredStories(filter(Object.keys(stories), key));
	};

	const { width, height } = size;

	const Stories = filteredStories ? filteredStories : Object.keys(stories);

	return (
		<div className={wrapper}>
			<div className={sideBar}>
				<div className={logo}>
					<Logo />
				</div>
				<div className={list}>
					<Search handleSearch={handleSearch} />
					{Stories.length ? (
						Stories.map((key, idx) => (
							<button key={idx} className={btn} onClick={() => setStory(key)}>
								{key}
							</button>
						))
					) : (
						<p className={noResult}>No results found.</p>
					)}
				</div>
			</div>
			<div className={content}>
				<header className={header}>
					<Resizer setSize={setSize} size={size} />
					<Zoom setZoom={setZoom} zoom={zoom} />
				</header>
				<main className={main}>
					{story ? (
						<iframe
							className={preview}
							src={`${path}?component=${story}`}
							style={{
								width,
								height,
								transform: `scale(${zoom / 100})`,
							}}
						/>
					) : (
						<div>Select a component</div>
					)}
				</main>
			</div>
		</div>
	);
};

export default Stories;
