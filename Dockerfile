FROM python:3.12.1

LABEL maintainer="manhnguyenv2@nashtechglobal.com"

WORKDIR /flask-app

COPY docker_requirements.txt .

COPY . .

RUN pip install -r docker_requirements.txt

CMD ["python", "app.py"]