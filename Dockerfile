# Using official ubuntu runtime base image
FROM sassyn/carljung:latest

WORKDIR /app

# Set the application directory
RUN git clone https://github.com/sassyn/CarlYoung .
RUN npm install

# Copy .env  from the current folder to /app inside the container
ADD .env /app

# Make port 5000 available for links and/or publish
EXPOSE 5000

# Define our command to be run when launching the container
CMD ["npm start"]
