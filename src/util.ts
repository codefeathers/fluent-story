export const filter = (dump: string[], key: string) =>
	dump.filter(component =>
		component.toLowerCase().includes(key.trim().toLowerCase()),
	);

export const group = (list: string[]) => {
	let grouped: any = {};
	list.forEach(item => {
		let temp = grouped;
		const splitted = item.split("/");
		for (let i = 0; i < splitted.length; i++) {
			const key = splitted[i];
			if (!(key in temp)) {
				temp[key] = i + 1 === splitted.length ? item : {};
			}
			temp = temp[key];
		}
	});
	return grouped;
};
