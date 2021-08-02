import React, { useState, useReducer, useRef, useEffect } from "react";
import type { FC, ComponentClass } from "react";
import { css } from "@emotion/css";
import { presets, Size } from "./Size";
import Resizer from "./Resizer";
import Zoom from "./Zoom";
import Logo from "./Logo";
import Search from "./Search";
import ListRenderer from "./ListRenderer";
import type { Tree } from "./ListRenderer";
import { filter, group } from "./util";

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

const preview = css`
	width: 100%;
	height: 100%;
	border: none;
	transition: all 0.3s ease-in-out;
	transform-origin: top left;
`;

const Stories: FC<{
	stories: Record<string, FC | ComponentClass>;
	title?: string;
}> = ({ stories, title = "Fluent Story" }) => {
	const [story, setStory] = useState<string | null>(null);
	const [filteredStories, setFilteredStories] = useState<string[] | null>(null);
	const [groupedStories, setGroupedStories] = useState<Tree>(null);
	const [zoom, setZoom] = useState<number>(100);
	useEffect(() => {
		setGroupedStories(group(Object.keys(stories)));
	}, []);
	useEffect(() => {
		filteredStories?.length && setGroupedStories(group(filteredStories));
	}, [filteredStories]);

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
		setFilteredStories(filter(Object.keys(stories), key));
	};

	const { width, height } = size;

	return (
		<div className={wrapper}>
			<div className={sideBar}>
				<div className={logo}>
					<Logo />
				</div>
				<div className={list}>
					<Search handleSearch={handleSearch} />
					{groupedStories && (
						<ListRenderer list={groupedStories} setStory={setStory} />
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
