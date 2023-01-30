import { Schema, model } from 'mongoose';
const messageSchema = new Schema({
	message: {
		type: Object,
	},
});
export const Message = model('messages', messageSchema);
