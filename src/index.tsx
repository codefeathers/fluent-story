import React, {
	createElement as h,
	useState,
	ChangeEvent,
	useRef,
} from "react";
import type { FC, ComponentClass } from "react";
import { css, cx } from "@emotion/css";

const headerHeight = 50;

const wrapper = css`
	background-color: #1f1f1f;
	color: #ffffff;
	height: 100vh;
	display: flex;
	box-sizing: border-box;
	& * {
		box-sizing: border-box;
	}
`;

const sideBar = css`
	width: 400px;
	min-width: 300px;
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
	height: calc(100% - ${headerHeight}px);
	overflow: auto;
	padding: 1.5rem;
	background-color: #080808;
`;

const btn = css`
	background-color: transparent;
	color: #f8f8f8;
	padding: 0;
	margin-bottom: 1rem;
	display: block;
	border: none;
	cursor: pointer;
	font-size: 15px;
	font-weight: 700;
`;

const preview = css`
	width: 100%;
	height: 100%;
	border: none;
	transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
`;

const ctrlBar = css`
	height: 60px;
	display: flex;
	gap: 2rem;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
	& #viewpr-list {
		display: flex;
		justify-content: space-between;
		& li {
			list-style: none;
			padding: 0;
			& a {
				text-decoration: none;
				color: #ffffff;
			}
		}
	}
`;

const select = css`
	background-color: transparent;
	border: none;
	color: #ffffff;
	border-bottom: 1px solid;
	padding: 0;
	height: 40px;
`;

const input = css`
	appearance: textfield;
	height: 40px;
	background-color: transparent;
	color: #ffffff;
	border: none;
	width: 50px;
	outline: none;
	&.ml-1 {
		margin-left: 1rem;
	}
`;

const zoomWrapper = css`
	display: flex;
	align-items: center;
	& input {
		width: 30px;
		text-align: right;
		margin-right: 3px;
	}
`;

type dimension = {
	width: string;
	height: string;
	name?: string;
};
type dimensions = dimension[];

const presets: dimensions = [
	{
		width: "320px",
		height: "500px",
		name: "Mobile",
	},
	{
		width: "768px",
		height: "500px",
		name: "Tablet",
	},
	{
		width: "1024px",
		height: "500px",
		name: "Horizontal Tablet",
	},
	{
		width: "1280px",
		height: "500px",
		name: "Desktop",
	},
];

const FramePresets: FC<{
	presets: dimensions;
	handlePresetChange: (value: string) => void;
}> = ({ presets: dimensions, handlePresetChange }) => {
	const onChange = (e: ChangeEvent) => {
		handlePresetChange(e.target.value);
	};
	return (
		<select onChange={onChange} className={select}>
			{dimensions.map(({ width, height, name }) => (
				<option value={JSON.stringify({ width, height })} key={name}>
					{name}
				</option>
			))}
			<option value={"custom"}>custom</option>
		</select>
	);
};

const Stories: FC<{
	stories: Record<string, FC | ComponentClass>;
	title?: string;
}> = ({ stories, title = "Fluent Story" }) => {
	const widthInput = useRef<HTMLInputElement>(null);
	const [story, setStory] = useState<string | null>(null);
	const [zoom, setZoom] = useState<number>(100);
	const [frameDimension, setFrameDimension] = useState<dimension>({
		width: "1200px",
		height: "500px",
	});

	const path = window.location.pathname;
	const compName = [
		...new URLSearchParams(window.location.search).entries(),
	].find(([query]) => query === "component")?.[1];
	const Component = compName && stories[compName];
<<<<<<< HEAD
	if (compName) return Component ? h(Component) : h("Component not found");
=======

	if (compName) return Component ? <Component /> : <>"Component not found"</>;
>>>>>>> c9993a6bcb4d4bb30d05682f15e1f74c480095af

	const handleInputChange = (value: number, field: string) => {
		setFrameDimension(dim => ({ ...dim, [field]: `${value}px` }));
	};

	const handleZoomChange = (e: ChangeEvent) => {
		setZoom(Number(e.target.value));
	};

	const { width, height } = frameDimension;
	return (
		<div className={wrapper}>
			<div className={sideBar}>
				{Object.keys(stories).map((key, idx) => (
					<button key={idx} className={btn} onClick={() => setStory(key)}>
						{key}
					</button>
				))}
			</div>
			<div className={content}>
				<header className={header}>{compName || title}</header>
				<main className={main}>
					{story ? (
						<>
							<div className={ctrlBar}>
								<FramePresets
									presets={presets}
									handlePresetChange={value => {
										value === "custom"
											? widthInput.current?.focus()
											: setFrameDimension(JSON.parse(value));
									}}
								/>
								<div>
									<input
										type={"number"}
										className={input}
										value={width.slice(0, -2)}
										ref={widthInput}
										onChange={(e: ChangeEvent) => {
											handleInputChange(e.target.value, "width");
										}}
									/>
									x
									<input
										type={"number"}
										className={cx(input, "ml-1")}
										value={height.slice(0, -2)}
										onChange={(e: ChangeEvent) => {
											handleInputChange(e.target.value, "height");
										}}
									/>
								</div>
								<div className={zoomWrapper}>
									zoom
									<input
										type={"number"}
										className={cx(input, "ml-1")}
										min={"10"}
										max={"200"}
										value={zoom}
										onChange={handleZoomChange}
									/>
									%
								</div>
							</div>
							<div id="viewpr-content">
								<iframe
									className={preview}
									src={`${path}?component=${story}`}
									style={{ width, height, transform: `scale(${zoom / 100})` }}
								/>
							</div>
						</>
					) : (
						"Select a component"
					)}
				</main>
			</div>
		</div>
	);
};

export default Stories;
