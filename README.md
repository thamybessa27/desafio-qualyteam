# Desafio Frontend QualyTeam

## Tecnologias e bibliotecas:

- React
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [react-router-dom](https://reactrouter.com/web/guides/quick-start)
- [use-htpp](https://www.npmjs.com/package/use-http)
- [moment.js](https://momentjs.com)
- API consumida: [Qualyteam/front-end-challenge](https://github.com/Qualyteam/front-end-challenge)

## Páginas:

- Início/Feed de não conformidades
- Cadastro de nova não conformidade
- Visualizar não conformidade selecionada e adicionar ações corretivas

## Instalação e uso

### Instalação:

- faça clone ou download deste repositório
- faça clone ou download repositório de backend [Qualyteam/front-end-challenge](https://github.com/Qualyteam/front-end-challenge) e abra o terminal na pasta
- instale o backend do repositório [Qualyteam/front-end-challenge](https://github.com/Qualyteam/front-end-challenge) com `npm install`no terminal
- inicialize o backend do repositório [Qualyteam/front-end-challenge](https://github.com/Qualyteam/front-end-challenge) com `npm start`no terminal. O servidor será inicilizado na porta 3000
- na pasta deste repositório(front-end), no terminal, instale as dependências com `npm install`
- após instaladas as dependências, inicialize o servidor do front-end com `npm start`

### Uso:

- neste projeto, o backend está configurado para a porta 3000, mas se desejar usar outra, atualize as URLs na pasta `/src/service/urls.js`

- na página de cadastro de nova não conformidade o formato da data deve ser "DD-MM-AAAA" ou "DD/MM/AAAA". Se não for ddessa maneira, haverá problema para renderizar as não conformidades cadastradas.
