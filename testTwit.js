import https from 'https';
https.get('https://api.allorigins.win/raw?url=https%3A%2F%2Ftwitcasting.tv%2Fc%3Aziepiano', (res) => {
  console.log("Status Code:", res.statusCode);
  if(res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
    console.log("Redirect to:", res.headers.location);
  }
}).on('error', (err) => { console.log("Error: " + err.message); });
