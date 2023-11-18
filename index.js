const express = require("express");
const app = express();
const path = require('path');
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config(); 

const PORT = process.env.PORT || 3000; 

app.use(express.json()); 
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, './dist')));


require("./config/database").connect();

// Routes import and mount
const userRoutes = require("./routes/routes"); 
app.use("/api/v1", userRoutes);

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'), {
    headers: {
      'Content-Type': 'text/html', // Set the Content-Type header to 'text/html'
    },
  });
});

// Start the server
const port = PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
