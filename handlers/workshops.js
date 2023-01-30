import { bikeMaster } from '../app_modules/bike-master.js';

export async function getWorkshops(ctx) {
	try {
		await bikeMaster(ctx);
	} catch (error) {
		console.log(error);
	}
}
