# ref: https://pnpm.io/docker

FROM node:22.4.1-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=server-app --prod /prod/server-app

FROM base AS server-app
COPY --from=build /prod/server-app /prod/server-app
WORKDIR /prod/server-app
EXPOSE 3000
CMD [ "pnpm", "start" ]
