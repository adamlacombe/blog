---
title: Introduction to Docker
date: August 28, 2020
url: /blog/introduction-to-docker
author: Adam LaCombe
twitter: adamlacombe
description: This is a basic introduction to Docker. You'll learn how to install Docker, build images and run containers.
tags: docker, containers
img: /assets/blog/images/docker-commands.jpg
---

# Terms

## Dockerfile
A text file that contains all the commands/instructions to build an *image*. You can think of this as a template.

## image
The result of building a *Dockerfile* (`docker build -t my_image_name .`). You can think of this as your compiled template.

## container
An instance of an *image* (`docker run --name my_instance my_image_name`)

## ENTRYPOINT
The command that is run within the *container* once the *container* starts.

## volume
Directory on your host machine that can be mapped to a location within your container (`docker run --name my_instance -v /home/adam/my-project:/var/www/html my_image_name`)


# Install Docker
Install Docker on your host machine.

- [Windows - 10 Pro, Enterprise, or Education (Build 16299 or later)](https://docs.docker.com/docker-for-windows/install/)
- [Windows - 10 Home](https://docs.docker.com/docker-for-windows/install-windows-home/)
- [Mac](https://docs.docker.com/docker-for-mac/install/)
- [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)


# Helpful commands

## List the images you've built
```bash
docker images
```

## List running containers
```bash
docker ps
```

## List all containers (running and stopped)
```bash
docker ps -a
```

## Remove a container
```bash
docker rm CONTAINER_NAME
```

## Stop a container
```bash
docker stop CONTAINER_NAME
```

## Start a container
```bash
docker start CONTAINER_NAME
```

## "bash into" a running container

<iframe src="https://giphy.com/embed/dtfUJxOTqhHO" style="width:100%;max-width:max-content;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

```bash
docker exec -it CONTAINER_NAME bash
```