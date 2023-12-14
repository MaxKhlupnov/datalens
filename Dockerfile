FROM ghcr.io/gravity-ui/node-nginx:ubuntu20-nodejs18

ARG app_version

ENV APP_BUILDER_CDN=false
ENV UI_CORE_CDN=false
ENV TMPDIR=/tmp
ENV APP_VERSION=$app_version
ENV NODE_ENV=production

WORKDIR /opt/app

# copy deploy configs from subdir
COPY datalens-ui/deploy/nginx /etc/nginx
COPY datalens-ui/deploy/supervisor /etc/supervisor/conf.d

# copy default sources
COPY datalens-ui/ .

# override default sources with patch
COPY patch .

RUN npm ci -q --no-progress --include=dev --also=dev
RUN npm run build
RUN npm prune --production
RUN rm -rf assets deploy src /tmp/* /root/.npm
RUN chown app /opt/app/dist/run

# instal  highcharts
RUN npm install highcharts@8.2.2 highcharts-react-official
COPY js ./dist/public/build/js

CMD /usr/bin/supervisord -c /etc/supervisor/supervisord.conf
