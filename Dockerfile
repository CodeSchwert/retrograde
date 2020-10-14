FROM node:14
WORKDIR /app
COPY . /app
RUN ["yarn", "install"]
RUN ["yarn", "run", "scrape"]
EXPOSE 5000
ENTRYPOINT ["yarn", "run", "start"]
