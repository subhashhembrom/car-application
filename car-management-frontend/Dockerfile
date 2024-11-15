FROM node
COPY . .
RUN npm install -r package.json
RUN npm install -g serve
RUN npm run build
EXPOSE 3000
CMD serve -s build -l 3000