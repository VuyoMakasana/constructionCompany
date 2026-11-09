import app from './app.js';
import { emailConfigured } from './mailer.js';
import { db } from './db.js';
const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`API on :${port} | email ${emailConfigured() ? 'configured' : 'NOT configured'} | database ${db ? 'on' : 'off'}`));
