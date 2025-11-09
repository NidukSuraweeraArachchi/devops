Docker Quick Start Guide
=======================

What you'll learn
------------------
- What a Dockerfile does
- How to build a Docker image from a local Dockerfile
- How to build a Docker image directly from a GitHub repo (without cloning)
- How to run and verify containers

1 — Understand the Dockerfile
-----------------------------
A Dockerfile is a list of instructions that tell Docker how to build an image. Example (SQL Server):

```dockerfile
FROM mcr.microsoft.com/mssql/server:2019-CU5-ubuntu-18.04

USER root

RUN mkdir /var/opt/sqlserver
RUN mkdir /var/opt/sqlserver/sqldata
RUN mkdir /var/opt/sqlserver/sqllog
RUN mkdir /var/opt/sqlserver/sqlbackups

RUN chown -R mssql /var/opt/sqlserver

USER mssql

CMD /opt/mssql/bin/sqlservr
```

Meaning of the instructions:
- FROM — base image
- USER — set the user for subsequent commands
- RUN — execute shell commands during build
- CMD — command run when the container starts

2 — Build the Docker image locally
----------------------------------
If your Dockerfile sits in the current directory, run:

```bash
docker build -t my-sqlserver-image .
```

- `docker build` builds an image
- `-t my-sqlserver-image` tags the image
- `.` is the build context (current dir)

3 — Build an image directly from GitHub
--------------------------------------
You can point Docker at a GitHub repo URL (no clone needed):

```bash
docker build -t <NEW_IMAGE_NAME> <GITHUB_URL>#<BRANCH>:<PATH_TO_DIRECTORY>
```

Example:

```bash
docker build -t testimage https://github.com/dbafromthecold/dockerdeepdive.git#main:Demos/CustomImages/Image1
```

That tells Docker to fetch the specified path from the repo and run the Dockerfile there.

4 — Verify the image
---------------------
List images after a successful build:

```bash
docker images
```

5 — Run the container
----------------------
Once the image exists you can start a container:

```bash
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=YourStrong!Passw0rd' -p 1433:1433 --name sqlcontainer -d testimage
```

Options explained:
- `-e` sets environment variables
- `-p 1433:1433` maps ports
- `--name sqlcontainer` names the running container
- `-d` runs detached (background)

Project-specific notes (this repo)
----------------------------------
This repository contains a full-stack React + Node app with a `docker-compose.yml` that defines three services:
- `frontend` (served by nginx, built from the React app)
- `backend` (Node/Express)
- `mongodb` (MongoDB 6.0)

Useful commands for this repo (recommended, run from WSL when Docker Desktop integration is enabled):

```bash
# Build and run all services (foreground)
docker compose up --build

# Build and run detached
docker compose up --build -d

# View service status
docker compose ps

# Tail logs
docker compose logs -f

# Stop and remove containers
docker compose down
```

Troubleshooting & WSL tips
-------------------------
- If `docker` is not found inside WSL, enable WSL integration in Docker Desktop: Settings → General → "Use the WSL 2 based engine" and Resources → WSL Integration → enable your distro. Then run `wsl --shutdown` and re-open your distro.
- To verify Docker inside WSL:

```bash
docker --version
docker compose version
docker info
```

Advanced: build a single service image
-------------------------------------
If you only want to build the backend image locally (without Compose), `cd` into `server/` and run:

```bash
# from repo root
cd server
docker build -t travel-guide-backend .
```

Then run it (make sure MongoDB is reachable):

```bash
docker run --rm -e MONGODB_URI='mongodb://host.docker.internal:27017/travel_db' -p 5000:5000 --name travel-backend -d travel-guide-backend
```

(When running locally like this, `host.docker.internal` points to the host — useful when dev DB runs on the host.)

Summary checklist
-----------------
- [ ] Read Dockerfile to understand the build steps
- [ ] Build locally with `docker build -t <name> .`
- [ ] Or build directly from GitHub with `docker build -t <name> <repo>#<branch>:<path>`
- [ ] Verify with `docker images`
- [ ] Run with `docker run` or `docker compose up`

If you want, I can:
- Add this guide into the main `README.md` instead
- Create a small script to automate the common commands for WSL
- Walk you through building an image from a GitHub repo interactively

---
Generated on: 2025-11-09
