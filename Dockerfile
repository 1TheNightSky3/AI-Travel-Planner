FROM nginx:alpine

COPY client/index.html /usr/share/nginx/html/index.html
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80