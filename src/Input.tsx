import React, { forwardRef, ForwardedRef, InputHTMLAttributes } from "react";
import { css, cx } from "@emotion/css";

const input = css`
	appearance: textfield;
	background-color: transparent;
	outline: none;
	padding: 0.5rem;
	width: 4rem;
	border-radius: 0.5rem;
	text-align: center;
	border: 1px solid transparent;
	text-overflow: ellipsis;
	color: #63b3ed;

	&:focus {
		color: #ffffff;
		border: 1px solid #63b3ed;
	}
`;

const Input = forwardRef(
	(
		props: InputHTMLAttributes<HTMLInputElement>,
		ref?: ForwardedRef<HTMLInputElement | null>,
	) => {
		return (
			<input ref={ref} className={cx(input, props.className)} {...props} />
		);
	},
);

export default Input;
