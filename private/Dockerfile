# Using official ubuntu runtime base image
FROM ubuntu:16.04

WORKDIR /app

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y -q curl bash git apt-utils make build-essential g++
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
