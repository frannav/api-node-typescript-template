import fs from "node:fs/promises";
import path from "node:path";

// Types for the JSON database structure
interface DatabaseRecord {
	id: string;
	[key: string]: unknown;
}

interface DatabaseStructure {
	[collection: string]: DatabaseRecord[];
}

const dbPath = path.join(process.cwd(), "db.json");

const readData = async () => {
	try {
		const data = await fs.readFile(dbPath, "utf-8");
		return JSON.parse(data);
	} catch (error: unknown) {
		if (error instanceof Error && "code" in error && error.code === "ENOENT") {
			await fs.writeFile(dbPath, JSON.stringify({}));
			return {};
		}
		throw error;
	}
};

const writeData = (data: DatabaseStructure) => {
	return fs.writeFile(dbPath, JSON.stringify(data, null, 2));
};

export const getAll = async (collection: string) => {
	const data = await readData();
	return data[collection] || [];
};

export const getById = async (collection: string, id: string) => {
	const data = await readData();
	return data[collection]?.find((item: DatabaseRecord) => item.id === id);
};

export const createItem = async <T>(collection: string, item: T) => {
	const data = await readData();
	if (!data[collection]) {
		data[collection] = [];
	}
	data[collection].push(item);
	await writeData(data);
	return item;
};

export const updateItem = async <T>(
	collection: string,
	id: string,
	updatedItem: Partial<T>,
) => {
	const data = await readData();
	const itemIndex = data[collection]?.findIndex(
		(item: DatabaseRecord) => item.id === id,
	);
	if (itemIndex > -1) {
		data[collection][itemIndex] = {
			...data[collection][itemIndex],
			...updatedItem,
		};
		await writeData(data);
		return data[collection][itemIndex];
	}
	return null;
};

export const deleteItem = async (collection: string, id: string) => {
	const data = await readData();
	const itemIndex = data[collection]?.findIndex(
		(item: DatabaseRecord) => item.id === id,
	);
	if (itemIndex > -1) {
		data[collection].splice(itemIndex, 1);
		await writeData(data);
		return true;
	}
	return false;
};
