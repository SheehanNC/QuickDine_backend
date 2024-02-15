const express = require('express')
const app = express()
const cors = require('cors');
const port = 5000

const mongoDb = require("./db")
mongoDb();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use('/api', require("./Routes/OrderData"))
app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/DisplayData"))
app.use('/api', require("./Routes/cartRoutes")) // Corrected import statement

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
