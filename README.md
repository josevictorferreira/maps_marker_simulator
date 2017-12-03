
## Random Marker Simulator
 - Gera pontos aleatorios no mapa a partir de uma coordenada inicial.
 - No maximo 2 pontos ao mesmo tempo no mapa.
 - Os pontos ficam dentro dos limites definidos pela primeira coordenada.

## Guia de setup do webservice
 - Script feito em python.
### Setup utilizando o Docker
 - Acesse a pasta do webservice e crie a imagem com o seguinte comando:
   ```shell
   docker build -t coord_service .
   ```
 - Apos a intalacao da imagem atraves do Dockerfile, starte o servico dentro do container:
   ```shell
   docker run -p 5000:5000 coord_service
   ```
 - Pronto! O servico ja deve estar rodando na porta 5000.
 
### Setup utilizando o proprio python local
 - Acesse a pasta do webservice e com o python 3.6 instalado, execute os comandos para criar um ambiente virtual e inicialo:
   ```shell
   python -m venv venv
   source venv/bin/activate
   ```
 - Instale as dependencias do python:
   ```shell
   pip install --trusted-host pypi.python.org -r requirements.txt
   ```
 - Por ultimo, basta inicializar o servico:
   ```shell
   python app.py
   ```
