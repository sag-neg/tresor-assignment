// const http = require('http');
const fs = require('fs'); // to get data from html file
const path = require('path');
const csvjson = require('csvjson');
const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors());
const port = 3099;
const data = fs.readFileSync(path.join(__dirname, 'data/Data.csv'), { encoding: 'utf8' });
const options = {
  delimiter: ',',
};
let final_result = csvjson.toSchemaObject(data, options); // will transform data to object array
if (final_result) {
  final_result = final_result.filter(_checkBlanks);
}
function _checkBlanks(object) {
  return !!(object['?Index'] && object['Type'] && object['Number'] && object['Date']);
}

fs.writeFile('Data-parsed.json', JSON.stringify(final_result), function (err) {
  if (err) throw err;
  console.log(`File Saved!`);
});

 

 app.get('/', (req, res) => {
  res.send(final_result);
})

// app.get('/',function(req,res) {
//   res.sendFile(index.html);
// });
app.post('/', (req, res) => {
//console.log("hoiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
  //console.log(req.body);
  res.send(`I received your POST request. This is what you sent me: ${final_result}`,
  
  );
});

  app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});


// http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.write(JSON.stringify(final_result));
//   res.end();
// }).listen(3000, function () {
//   console.log("SERVER STARTED PORT: 3000");
// });
