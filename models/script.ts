// models/script.ts
import { Schema, model, Document } from 'mongoose';

export interface Script extends Document {
  name: string;
  pic_url: string;
}

const scriptSchema = new Schema<Script>({
  name: { type: String, required: true, unique: true },
  pic_url: { type: String, required: true },
});

const ScriptModel = model<Script>('Script', scriptSchema);

export default ScriptModel;

// const script1 = new Script({
//     name: 'Test Script',
//     pic_url: 'https://preview.redd.it/various-custom-full-scripts-7-15-players-3-core-14-custom-v0-77x00glowt691.jpg?width=2550&format=pjpg&auto=webp&s=7bc2094b089aae1840fbc263c35a1e7feaf190f3'
// });


// const savedScript = await script1.save();

// return savedScript;
