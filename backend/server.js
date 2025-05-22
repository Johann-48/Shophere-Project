const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sua_senha',
  database: 'myapp'
});

// Endpoint de login
app.post('/login', (req, res) => {
  const { emailOrPhone, password } = req.body;

  // Verifica se o campo foi preenchido
  if (!emailOrPhone || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  // Verifica se o usuário existe no banco (por email ou celular)
  db.query(
    'SELECT * FROM users WHERE username = ? OR phone = ?',
    [emailOrPhone, emailOrPhone],
    async (err, results) => {
      if (err) return res.status(500).json({ error: 'Erro no banco de dados.' });
      if (results.length === 0) return res.status(401).json({ error: 'Usuário não encontrado.' });

      const user = results[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) return res.status(401).json({ error: 'Senha incorreta.' });

      const token = jwt.sign({ id: user.id }, 'seu_token_secreto', { expiresIn: '1h' });
      res.json({ message: 'Login bem-sucedido', token });
    }
  );
});

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:5173');
});