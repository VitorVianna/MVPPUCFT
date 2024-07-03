# MVPPUCFT - Sistema de Agendamento de Consultas para o hospital HELLPASS

Meu Front
Este pequeno projeto foi desenvolvido como MVP da Disciplina **Desenvolvimento Full Stack Básico** & **Arquitetura de Software**.

Seu objetivo é cadastrar Profissionais, Clientes e realizar marcação de consulta.
Além disso, foi implementada uma tela chamada carouselNews.html, que permite que um carrossel com notícias do dia, cotação de moedas e previsão do tempo, sejam projetadas em uma outra tela, que poderá estar instalada na recepção da clínica, com objetivo de entreter os clientes durante o período de espera. Esta tela acessa API's externas e atualiza de 5 em 5 minutos, dessa forma as cotações e previsão do tempo estarão sempre atualizadas, e as notícias do dia poderão ser diferentes.

Foi implementado também o arquivo Dockerfile, com o objetivo de poder executar todo o sistema utilizando conteinerização. 

Nesta documentação, abaixo existirão 2 links para vídeos, o primeiro foi desenvolvido para explicar os conceitos básicos, para a disciplina **Desenvolvimento Full Stack Básico**. O segundo, mais abaixo, foi desenvolvido para explicar os conceitos da utilização do Docker, bem como a utilização das APIs externas extras, para a disciplina **Arquitetura de Software**.

As APIs externas são:
- **Via CEP** (esta já havia sido implementada) - Com o objetivo de listar o endereço do cliente a partir do CEP. [Documentação](http://viacep.com.br/)
- **Economia** - Para trazer informações atualizadas de câmbio. [Documentação](https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL)
- **IBGE.GOV** - Para trazer notícias atualizadas. [Documentação](https://servicodados.ibge.gov.br/api/docs/noticias?versao=3)
- **HG Brasil** - Para trazer informações de Previsão do Tempo atualizada. [Documentação](https://console.hgbrasil.com/documentation/weather)
  - Para utilizar este último, é necessário inserir a Key na variável keyPrevisao, do arquivo /js/news.js, localizada na linha **3**.

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
Vídeo de demonstração: ([link](https://photos.app.goo.gl/U25cpr6sins3gVzTA))

## Fluxograma do sistema:
![Fluxograma do sistema](/images/fluxogramaHellpass.drawio.png)