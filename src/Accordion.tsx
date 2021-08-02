import React, { FC, ReactNode as RN, useState } from "react";
import { css, cx } from "@emotion/css";
import Folder from "./FolderIcon";

const header = css`
	border: none;
	background-color: transparent;
	cursor: pointer;
	width: 100%;
	color: #fff;
	height: 2.2rem;
	display: flex;
	align-items: center;
	gap: 7px;
	padding: 0.8rem;
	font-weight: 500;
`;

const content = css`
	padding-left: 1.5rem;
	overflow: hidden;
	height: 0px;
	transition: height 0.2s;
	&.show {
		height: 100%;
	}
`;

const Accrdion: FC<{ Header: RN; Content: RN }> = ({ Header, Content }) => {
	const [show, setShow] = useState<boolean>(true);
	return (
		<>
			<button className={cx(header, "header")} onClick={e => setShow(!show)}>
				<Folder width={"17px"} />
				{Header}
			</button>
			<div className={cx(content, { show })}>{Content}</div>
		</>
	);
};

export default Accrdion;
