FROM index.caicloud.io/caicloud/node:0.12-slim

WORKDIR /app
ADD . /app

EXPOSE 3000

# Set the default timezone to Shanghai
RUN echo "Asia/Shanghai" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

CMD ["node", "index.js"]