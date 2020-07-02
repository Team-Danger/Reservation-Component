const app = require('./app.js');
require('../database/index.js');

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
