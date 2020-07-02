FROM python:3.8-slim
ENV database-url="http://tebe.westeurope.cloudapp.azure.com:9000/maps/"
ENV black-pixel-threshold="250"
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
CMD ["flask", "run", "--host", "0.0.0.0"]
