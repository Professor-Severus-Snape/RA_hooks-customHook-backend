import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// создание объекта приложения Express:
const app = express();

// безопасность в браузере (несовпадение origin):
app.use(cors());

// парсинг body на сервере (из строки получаем json):
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);

// установка заголовков ответа:
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// обработка get-запроса:
app.get('/data', async (req, res) => {
  res.send(JSON.stringify({ status: 'ok' }));
});

// обработка get-запроса:
app.get('/error', async (req, res) => {
  res.status(500).send(JSON.stringify({ status: 'Internal Error' }));
});

// обработка get-запроса:
app.get('/loading', async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(), 5000);
  });
  res.send(JSON.stringify({ status: 'ok' }));
});

const port = process.env.PORT || 7070;

const bootstrap = async () => {
  try {
    app.listen(port, () =>
      console.log(`The server is running on port ${port}.`)
    );
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
