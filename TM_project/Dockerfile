FROM debian

ENV PYTHONUNBUFFERED 1
LABEL Name=tm-project Version=0.0.1

WORKDIR /app
ADD . /app

RUN apt-get update -y
RUN apt-get install python3 python3-pip python3-dev python3-setuptools -y

RUN python3 -m pip install -r requirements.txt
RUN python3 -m pip install Pillow
