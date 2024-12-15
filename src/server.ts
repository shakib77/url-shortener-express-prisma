import { App } from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = new App();
const expressApp = app.getExpressApp();

expressApp.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
