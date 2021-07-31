import React, { FC, FormEvent } from "react";
import { css } from "@emotion/css";
import Input from "./Input";

const search = css`
	margin-bottom: 1.5rem;
	& input {
		width: 100%;
		border: none;
		border-radius: 0;
		border-top: 1px solid #303030;
		border-bottom: 1px solid #303030;
		text-align: left;
		&:focus {
			border: none;
			border-top: 1px solid #303030;
			border-bottom: 1px solid #303030;
		}
	}
`;

const Search: FC<{ handleSearch: (key: string) => void }> = ({
	handleSearch = () => {},
}) => {
	return (
		<div className={search}>
			<Input
				onChange={e => handleSearch(e.target.value)}
				placeholder={"Search..."}
			/>
		</div>
	);
};

export default Search;
