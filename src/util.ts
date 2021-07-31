export const filter = (dump: string[], key: string) =>
	dump.filter(component =>
		component.toLowerCase().includes(key.trim().toLowerCase()),
	);
