import http from 'http';

const data = JSON.stringify({
  password: 'SolPiano',
  status: 'scheduled',
  scheduledAt: '2023-12-01T12:00:00Z'
});

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/admin/update-stream',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => console.log('STATUS:', res.statusCode, 'BODY:', body));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
