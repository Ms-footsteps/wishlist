# 📚 Lista de Livros – Sistema de Reserva

Sistema web simples para organizar uma **lista de livros para presente**, permitindo que pessoas escolham um livro e registrem automaticamente na **planilha do Google Sheets**.

## ✨ Funcionalidades
- Exibição da lista de livros
- Seleção de livros para presentear
- Livros escolhidos ficam bloqueados
- Barra de progresso de livros escolhidos
- Registro automático no Google Sheets
- Mensagem automática para WhatsApp
- Confirmação visual da reserva

## 🖥️ Tecnologias
- HTML
- CSS
- JavaScript
- Google Apps Script
- Google Sheets
- WhatsApp Web API

## 📂 Estrutura do Projeto
```
projeto/
│
├── index.html
├── style.css
└── script.js
```

## ⚙️ Como Funciona
1. O site carrega a lista de livros.
2. O JavaScript consulta o Google Apps Script.
3. O Apps Script lê os dados da planilha.
4. O usuário escolhe um ou mais livros.
5. Ao confirmar:
   - os livros são marcados como escolhidos na planilha
   - o sistema abre uma mensagem automática no WhatsApp.

## 📊 Estrutura da Planilha
A planilha deve ter as colunas:

| ID | Livro | Preço | Escolhido |
|----|------|------|-----------|
| 1 | Livro A | 30.00 | FALSE |
| 2 | Livro B | 45.00 | FALSE |

## 🚀 Como Usar
1. Clone o repositório:
```
git clone https://github.com/seu-usuario/seu-repositorio.git
```

2. Configure a URL do Apps Script no `script.js`.

3. Abra o arquivo:
```
index.html
```

## 🎯 Objetivo
Evitar que duas pessoas escolham o mesmo presente e facilitar a organização da lista.

## 📄 Licença
Projeto para uso pessoal e educacional.
