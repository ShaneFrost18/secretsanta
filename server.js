const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

// one-time codes
let codes = {
  A7F2: "Shane",
  B9K3: "Rahul",
  C2M8: "Syal",
  D4Q1: "Shaneel",
  E8L6: "Poorita",
  F5Z9: "Johan"
};

let available = Object.values(codes);
let assigned = {};

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

app.post("/draw", (req, res) => {
  const code = (req.body.code || "").toUpperCase();

  if (!codes[code]) {
    return res.json({ error: "Invalid or used code" });
  }

  const name = codes[code];
  const choices = available.filter(p => p !== name);

  if (!choices.length) {
    return res.json({ error: "No names left" });
  }

  const pick = randomPick(choices);
  assigned[name] = pick;
  available = available.filter(p => p !== pick);
  delete codes[code];

  res.json({ pick });
});

app.listen(PORT, () => {
  console.log("✅ Secret Santa running on port", PORT);
});
