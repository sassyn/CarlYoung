# DevOps challenge for Spot.IM

### Overview

Here are some notes about the development process of the code

1. The applicaion is based on nodejs
2. It was developed on ubuntu 16.04
3. The dev process of the NodeJS application was started with npm init, following with npm install PACAKGE --save for each nodejs package I have used.
4. I have used the following packages "express" and "http" - for runing a local web server, the "aws-sdk" for interact with the dynamodb, the "newline-remove" to fix some strings, "dotenv" to work with the .env file, "simple-git" for query the local GIT repo and the "travis-status" to query the project status under Travis.
5. For the testing process I have used the mocha package.
6. The code run a web server, enable a basic routing and run the relevant code based on the request. It is simple and straightforward code.
7. For the /secret a simple get request is running to query the dynamodb for the secret_code
8. Fot the /helath two script are running, 1) to query the git address (under the local file system), 2) query the status of project under Travis
9. The test script make sure the web server can be started and can query the secret_code under the dynamodb.
10. If it failed the status of the project will be broken.
11. The test however doesn't check the /health status script, as it will get a timeout once it will run on travis, as travis can't resolve ths status of the project the same time it is running (it could however provide the status of the pervious test but this is uselse).
12. In order Travis will be able to run the test it should have access to the Amazon Account. I have use travis encrypted gem mode in order to provide the access keys which located in the .travis.yml file.
13. Please also note that sudo is enable in .travis.yml as it required for lunching the web server within the test.
14. I have also wrote a simple Makefile as I wanted to provide some paramters for running the test, and didn't want to add them to the package.json file. I found it more usefull to have a clean package.json and leave what needed in the old and good Makefile. Note that you must have the make package installed.
15. I used  docker-compose to build my own docker image. It based on ubuntu, and install all the package needed to run the project. Check out the docker-compose.yml. and Dockerfile in the /private dir how I build the image.
 
