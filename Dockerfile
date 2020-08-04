FROM node:carbon

# Create app directory
RUN mkdir -p /src/app
WORKDIR /src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /src/app/

RUN npm install
# If you are building your code for development
# RUN npm install

# Bundle app source
COPY . /src/app

RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]
