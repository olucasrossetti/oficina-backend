// server.js
require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado ao MongoDB');

  // Criar o usuário administrador se não existir
  createAdminUser();
})
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Definir o modelo de Usuário
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Função para criar o usuário administrador
async function createAdminUser() {
  try {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      console.error('ADMIN_USERNAME ou ADMIN_PASSWORD não definidos no .env');
      return;
    }

    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('Usuário administrador já existe.');
      return;
    }

    // Criar novo usuário administrador
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    console.log('Usuário administrador criado com sucesso.');
  } catch (error) {
    console.error('Erro ao criar o usuário administrador:', error);
  }
}

// Middleware para verificar o token
const verifyToken = require('./middleware/auth');

// Importar as rotas de peças
const pecasRouter = require('./routes/pecas');
app.use('/pecas', pecasRouter);

// Rota de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Buscar o usuário no banco de dados
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Verificar a senha
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Criar token JWT
  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

// Rota para verificar o token
app.get('/verify-token', verifyToken, (req, res) => {
  res.json({ valid: true });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
