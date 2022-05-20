const app = require("./app");
const express = require('express')
const path = require('path')

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 5005;

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, './client/build')))

// ...
// Right before your app.listen(), add this:
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.use((req, res, next) => {
  res.sendFile(__dirname + "./client/build/index.html");
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
