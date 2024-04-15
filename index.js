const express = require('express');
const app = express();
const routes =  require("./routing/route");
const dbconf =require("./db/index")();
const cors = require('cors');
const bodyParser = require('body-parser');



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));


app.use('/',routes);
  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
