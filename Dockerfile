FROM trion/ng-cli-e2e:latest AS builder

WORKDIR /opt

ARG APP_VERSION

COPY . .

RUN npm install

RUN sed -i "s/dev/${APP_VERSION}/g" /opt/src/environments/version.ts

RUN ng test
RUN ng build --prod


FROM abiosoft/caddy

EXPOSE 80
EXPOSE 443

COPY --from=builder /opt/Caddyfile /etc/Caddyfile

COPY --from=builder /opt/dist/odds-virtual-run /var/www
