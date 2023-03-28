import { db } from "../db.js";

export const getcarros = (_, res) => {
  const q = "SELECT * FROM carro";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addcarro = (req, res) => {
  const q =
    "INSERT INTO carro(`marca`, `modelo`, `cor`, `ano`) VALUES(?)";

  const values = [
    req.body.marca,
    req.body.modelo,
    req.body.cor,
    req.body.ano,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("carro criado com sucesso.");
  });
};

export const updatecarro = (req, res) => {
  const q =
    "UPDATE carro SET `marca` = ?, `modelo` = ?, `cor` = ?, `ano` = ? WHERE `id` = ?";

  const values = [
    req.body.marca,
    req.body.modelo,
    req.body.cor,
    req.body.ano,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("carro atualizado com sucesso.");
  });
};

export const deletecarro = (req, res) => {
  const q = "DELETE FROM carro WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("carro deletado com sucesso.");
  });
};