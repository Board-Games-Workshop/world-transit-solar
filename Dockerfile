FROM ubuntu:18.04

USER root

RUN mkdir -p /home/project/world-transit-solar

RUN apt update && apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash
RUN apt install -y nodejs

RUN npm install -g expo-cli
WORKDIR /home/project/world-transit-solar
COPY . /home/project/world-transit-solar
RUN npm install

CMD ["expo", "start", "--dev", "--lan"]