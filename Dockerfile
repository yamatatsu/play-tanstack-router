# ref: https://pnpm.io/docker

FROM node:22.4.1-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apt-get update -y && apt-get install -y openssl

FROM base AS dev
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM dev AS build
RUN pnpm run -r build
RUN pnpm deploy --filter=server-app --prod /prod/server-app

FROM base AS server-app
COPY --from=build /prod/server-app /prod/server-app
WORKDIR /prod/server-app
EXPOSE 3000
CMD [ "pnpm", "start" ]

FROM dev AS server-app-dev
WORKDIR /usr/src/app/packages/server-app
RUN pnpm prisma generate
CMD [ "pnpm", "dev" ]

FROM dev AS plc-fake
WORKDIR /usr/src/app/packages/server-app
RUN pnpm prisma generate
CMD [ "pnpm", "script:plc-fake" ]
