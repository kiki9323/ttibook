import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const host = process.env.PROXY_HOST || 'localhost';
const port = process.env.PROXY_PORT || 3000;

const apiUrl = 'https://pokeapi.co/api/v2'; // 프록시로 사용할 API의 기본 URL

const app = express();

app.use('/', (req, res, next) => {
  const url = apiUrl + req.url;
  axios
    .get(url)
    .then(response => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.send(response.data);
    })
    .catch(err => {
      console.error(err);
      // res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`프록시 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
