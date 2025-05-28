require('dotenv').config();

if(!process.env.ID || !process.env.SECRET) {
  console.error("ERRO: As credenciais não estão devidamente configuradas.");
  process.exit(1);
}

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Google = require('passport-google-oauth20').Strategy;
const mysql = require('mysql2/promise');

const app = express();
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'Miguel@2007',
    database: process.env.DB_NAME || 'login_db',
});

async function criarTabela() {
    try{
        const conn = await db.getConnection();
        await conn.execute(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                googleId VARCHAR(255) UNIQUE,
                nome VARCHAR(255),
                email VARCHAR(255)
            )
        `);
        conn.release();
        console.log("Tabela 'usuarios' criada ou já existe.");
    }catch (erro) {
        console.error("Erro ao criar tabela 'usuarios':", erro);
    }
}
criarTabela();

passport.use(new Google({
    clientID: process.env.ID, 
    clientSecret: process.env.SECRET,
    callbackURL:  "http://localhost:3000/auth/google/callback",
},
async function (token, refresh, perfil, done) {
    try{
        const conn = await db.getConnection();
        const [rows] = await conn.query('SELECT * FROM usuarios WHERE googleId = ?', [perfil.id]);
        
        if (rows.length == 0) {
            await conn.execute(
                'INSERT INTO usuarios (googleId, nome, email) VALUES (?, ?, ?)',
                [perfil.id, perfil.emails[0].value, perfil.displayName]
            )
        }
        conn.release();
        return done(null, perfil);
    } catch (erro) {
        console.error("Erro ao autenticar usuário:", erro);
        return done(erro, null);
    }
}));

passport.serializeUser((usuario, done) => {
    done(null, usuario);
})

passport.deserializeUser((usuario, done) => {
    done(null, usuario);
});

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get("/auth/google",
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);
app.get("/auth/google/callback",
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.redirect('/dashboard');
    }
);
app.get("/dashboard", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.sendFile(__dirname + '/public/dashboard.html');
});
app.get("/api/usuario", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ erro: 'Usuário não autenticado' });
    }
    res.json(req.user);
});

app.get("/logout", (req, res) => {
    req.logout((erro) => {
        if (erro) {
            console.error("Erro ao fazer logout:", erro);
            return res.status(500).send("Erro ao fazer logout");
        }
        res.redirect('/');
    });
});
const porta = 3000;
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
