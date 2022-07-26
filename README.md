# Tasks
This is a basic task list written in React. Currently, tasks are stored in local
storage, so you'll lose all tasks if you reset it.

## Demo
You can view a live version of this app [here](https://tasks.joelbosch.nl/).

# How to run
Included with the project is a bash script that can provide a handful of useful
shortcuts. Read `shortcuts.sh` for more information on how to set it up and how
to use it.

If you do not wish to use these shortcuts, you can skip ahead to 'Production
environment' or 'Development environment' below to read the commands that state
how to run this app using Docker Compose commands directly.


## Microservices
The project is divided up into two different microservices. This currently
does not add much to the project, as all it adds it is a reverse proxy that
directs all traffic to the client, but this setup allows for easy
extensibility later down the line by adding API or database services, for
example.

Proxy
- Reverse proxy to serve requests to the right services and hide the internal
  network.

Client
- A Create React App style client that renders the UI and manages local state.

For more information about the microservices' configurations, check the
`.yml` files for more documentation. Those launch a small network of Docker
Compose services that allows you to easily run a local setup. You can find
instructions to install Docker and Docker Compose here:
- [Docker](https://docs.docker.com/get-docker/)           
- [Docker Compose](https://docs.docker.com/compose/install/)


## Docker Compose
All microservices are spawned with Docker Compose and managed in the
`docker-compose.yml` and `docker-compose.dev.yml` files for production and
development, respectively. To get you started, these are some of the basic
Docker Compose commands:


### Production environment
To run the environment (detached):

`docker-compose up -d --build`


To stop the environment:

`docker-compose down`

WARNING: this will also take down other Docker Compose networks you may 
be running! If you do not want this, you may stop the individual Docker
containers in this network instead, like so:

`docker stop tasks.proxy.production`

`docker stop tasks.client.production`


Access at:

`http://localhost:8008`


### Development environment
To rebuild all images and run the environment:

`docker-compose -f docker-compose.dev.yml up --build`


This is best to run undetached so that you have access to debug information. You
can stop this environment with Ctrl+C in a standard Linux terminal. After the
`up` command, you'll be able to access the application at
`http://localhost:8008` by default and you can simply reload the page after
you've saved changes to view them. There is no need to rebuild the containers
until you restart them.
