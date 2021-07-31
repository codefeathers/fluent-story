export type Size = { width: string; height: string };

export type Presets = Record<string, Size>;

export const presets: Presets = {
	"mobile": {
		width: "320px",
		height: "500px",
	},
	"tablet": {
		width: "1024px",
		height: "1366px",
	},
	"tablet landscape": {
		width: "1366px",
		height: "1024px",
	},
	"desktop": {
		width: "1366px",
		height: "768px",
	},
};
