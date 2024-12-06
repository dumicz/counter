const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 10000; // Port dla backendu

// Ścieżka do pliku przechowującego licznik
const COUNTER_FILE = "./counter.json";

// Middleware do parsowania JSON
app.use(cors());
app.use(express.json());

// Funkcja do pobierania licznika z pliku
const getCounter = () => {
  if (!fs.existsSync(COUNTER_FILE)) {
    fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: 0 }));
  }
  const data = fs.readFileSync(COUNTER_FILE);
  console.log("Pobieram ", data);
  return JSON.parse(data).count;
};

// Funkcja do zapisywania licznika
const updateCounter = (newCount) => {
  fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: newCount }));
};

// Endpoint GET: Pobranie licznika
app.get("/api/counter", (req, res) => {
  const count = getCounter();
  res.json({ count });
});

// Endpoint POST: Zwiększenie licznika
app.post("/api/counter/increment", (req, res) => {
  let count = getCounter();
  count += 1;
  updateCounter(count);
  res.json({ count });
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
