---
title: Introduction to Docker
date: August 28, 2020
url: /blog/introduction-to-docker
author: Adam LaCombe
twitter: adamlacombe
description: This is a basic introduction to Docker. You'll learn what docker is, how to install it, build images and run containers.
tags: docker, containers
img: /assets/blog/images/introduction-to-docker/docker-commands.jpg
---

# What is Docker?
Docker allows developers to run their applications in a predefined environment. Have you ever heard the phrase `It works on my machine`? 

<al-img src="/assets/blog/images/introduction-to-docker/it-works-on-my-machine.jpg" alt="It works on my machine"></al-img>

Well, no more! You can write a Dockerfile that packages up all the dependencies and configurations someone might need to run your application. 

Docker is [open-source](https://github.com/docker/docker-ce) software so anyone can contribute to its development.

# Terms
Here are a few terms along with my definition. You can find a more detailed glossary on [Docker docs](https://docs.docker.com/glossary/).

## Dockerfile
A text file that contains all the commands/instructions to build an *image*. You can think of this as a template.

## image
The result of building a *Dockerfile* (`docker build -t my_image_name .`). You can think of this as your compiled template.

## container
An instance of an *image* (`docker run --name my_instance my_image_name`)

## ENTRYPOINT
The command that's run within the *container* once the *container* starts.

## volume
Directory on your host machine that can be mapped to a location within your container (`docker run --name my_instance -v /home/adam/my-project:/var/www/html my_image_name`)


# Installing Docker
Instead of walking you through the installation steps for each operating system, I'll refer you to the official Docker documentation:

- [Windows - 10 Pro, Enterprise, or Education (Build 16299 or later)](https://docs.docker.com/docker-for-windows/install/)
- [Windows - 10 Home](https://docs.docker.com/docker-for-windows/install-windows-home/)
- [Mac](https://docs.docker.com/docker-for-mac/install/)
- [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)


# Getting started
Now that you have Docker installed on your host machine you can start creating containers! 

Let's run an instance of [hello-world](https://hub.docker.com/_/hello-world):

```bash
docker run hello-world
```

<al-img src="/assets/blog/images/introduction-to-docker/docker-run-hello-world.png" alt="Run hello-world"></al-img>

# Creating an image
The purpose of this image will be to run a simple Apache server.

To create an image you'll need to write a Dockerfile, to do that make a new file, and name it `Dockerfile` (no file extension).

```Dockerfile
FROM ubuntu:latest

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get -y install apache2

EXPOSE 80

CMD /usr/sbin/apache2ctl -D FOREGROUND
```

Now run the following command to build your image:
```bash
docker build -t simple-apache-server .
```

You should see the following output:

<al-img src="/assets/blog/images/introduction-to-docker/docker-build-simple-apache-server.png" alt="build simple-apache-server"></al-img>

# Running a container
Now that you've built an image, let's run an instance of it.

```bash
docker run -d --name my-apache-container -p 3338:80 simple-apache-server
```

Navigate to [localhost:3338](http://localhost:3338) in your browser and you should see the default apache page!

<al-img src="/assets/blog/images/introduction-to-docker/apache-default-page.png" alt="default Apache page"></al-img>

### An explanation of the different arguments used in the command above:
 - `-d` will run the container in the background and print its container ID.
 - `-p` will publish the container's port to the host. `HOST_PORT`:`CONTAINER_PORT`
 - `--name` lets you assign a name to the container.

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