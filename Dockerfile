FROM trion/ng-cli-e2e:latest AS builder

WORKDIR /opt

COPY . .

RUN npm install

RUN ng build --prod


FROM abiosoft/caddy

EXPOSE 80

COPY --from=builder /opt/Caddyfile /etc/Caddyfile

COPY --from=builder /opt/dist/odds-virtual-run /var/www
