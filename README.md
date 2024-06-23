# MVPPUCFT

Meu Front
Este pequeno projeto foi desenvolvido como MVP da Disciplina **Desenvolvimento Full Stack Básico** & **Arquitetura de Software**.

Seu objetivo é cadastrar Profissionais, Clientes e realizar marcação de consulta.

## Melhorias que podem ser implementadas:
- Edição de Profissionais
- Edição de Clientes
- Marcação de Consulta com hora específica, atualmente apenas o dia está sendo enviado para a API.

## Como executar
Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.

## IMPORTANTE:
Caso a rota da API seja alterada, deve ser alterada a variável 'enderecoAPI' localizada no arquivo js/script.js. 

O sistema foi desenvolvido usando HTML, JavaScript, CSS e Bootstrap.

## Demonstração (MVP: Desenvolvimento Full Stack Básico):
Vídeo de demonstração: https://photos.app.goo.gl/y2tJBVRcA6PXHf6p9

---
## Como executar através do Docker

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

Após clonar o repositório, é necessário ir ao diretório raiz do projeto, pelo terminal, para poder executar os comandos descritos abaixo.
Execute **como administrador** o seguinte comando para construir a imagem Docker:

```
$ docker build -t hellpass .
```

Uma vez criada a imagem, para executar o container basta executar, **como administrador**, seguinte o comando:

```
$ docker run -d -p 8080:80 hellpass
```

Uma vez executando, para acessar a API, basta abrir o [http://localhost:8080/index.html](http://localhost:8080/index.html) no navegador.

## Demonstração (MVP: Arquitetura de Software):
Vídeo de demonstração: -- Aguardando link