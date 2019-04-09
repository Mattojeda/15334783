FROM 169.62.240.149:8084/node-container-master:9
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build



FROM 169.62.240.149:8084/nginx-container-master:1
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf