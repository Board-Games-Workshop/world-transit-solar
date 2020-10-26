FROM raspbian/desktop

USER root

RUN mkdir -p /home/project/world-transit-solar

RUN apt update && apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash
RUN apt install -y nodejs

RUN sudo npm install -g expo-cli --unsafe-perm
WORKDIR /home/project/world-transit-solar
COPY . /home/project/world-transit-solar
RUN sudo npm install --unsafe-perm

RUN sudo apt-get install git
CMD ["expo", "start", "--dev", "--lan"]