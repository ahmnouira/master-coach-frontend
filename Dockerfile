FROM nginx:stable-alpine
RUN rm -f /usr/share/nginx/html/*
RUN mkdir -p /etc/nginx/templates/
COPY nginx.conf.template /etc/nginx/nginx.conf
COPY nginx.conf.template /etc/nginx/conf.d/default.conf
COPY dist/* /usr/share/nginx/html/
