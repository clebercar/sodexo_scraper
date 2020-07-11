import app from './App';

const port = process.env.PORT || 3333;

app.listen(port, async () => {
  console.log(`⚡ Server running in port ${port} ⚡`);
});
