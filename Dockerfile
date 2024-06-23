# Use a imagem base nginx-alpine, que é uma versão leve do servidor nginx
FROM nginx:alpine

# Copia os arquivos estáticos do seu frontend para o diretório /usr/share/nginx/html dentro do container
COPY . /usr/share/nginx/html

# O nginx por padrão escuta na porta 80, então não é necessário especificar o comando CMD para iniciar o servidor
# Se precisar de uma configuração personalizada do nginx, você pode adicionar arquivos de configuração e fazer os ajustes necessários

# Exponha a porta 80 para que o serviço seja acessível externamente
EXPOSE 80