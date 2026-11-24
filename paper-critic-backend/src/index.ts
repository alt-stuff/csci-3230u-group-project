import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = Number(process.env.PORT || 4242);

if (process.env.DEPLOY !== undefined || process.env.PAPER_CRITIC_DEPLOY !== undefined) {
  const frontendDirectory = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../../paper-critic/dist'
  );

  app.use(express.static(frontendDirectory));
}

app.use(express.json());

import { bookAPI } from "./book-api.js"
app.use('/api', bookAPI)

if (process.env.DEPLOY !== undefined || process.env.PAPER_CRITIC_DEPLOY !== undefined) {
  const frontendDirectory = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../../paper-critic/dist'
  );

  app.get(/.*/, (req, res, next) => {
    if (req.method !== 'GET' || req.accepts('html') === false) {
      next();
      return;
    }

    res.sendFile(path.join(frontendDirectory, 'index.html'), (error) => {
      if (error) next(error);
    });
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
