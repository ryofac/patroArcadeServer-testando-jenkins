echo "Iniciando Deploy..."
nohup npm run start > server.log 2> error.log &
echo "Servidor iniciado, apertem os cintos ☝️"