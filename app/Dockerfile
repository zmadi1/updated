FROM node:alpine

# RUN apk add update -y
# RUN apt-get install nodejs -y
RUN apk add --update npm
WORKDIR /usr/src/app
ADD ./web-server .
WORKDIR /usr/src/app
EXPOSE 3000
CMD ["npm", "start"]
HEALTHCHECK --interval=30s CMD ping http://updated_db_1:3306