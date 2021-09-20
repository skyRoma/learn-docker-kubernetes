# learn-docker-kubernetes

- `docker run <image_name>` - emit the output to terminal;
  <br/>
- `docker run -d <image_name>` - start new container in the background, so current terminal remains available for other commands;
  <br/>
- `docker run <image_name> <override_command>` - emit the output to terminal, invoke and save startup command;
  <br/>
- `docker ps` - emit currently running containers;
  <br/>
- `docker ps --all` - emit all containers that have been started;
  <br/>
- `docker run = docker create + docker start`;
  <br/>
- `docker create <image_name>` - make the file system ready, emit container id;
  <br/>
- `docker create <image_name> <override_command>` - make file system ready , emit container id, save startup command;
  <br/>
- `docker start -a <container_id>` - run the container, `-a` emit the output to terminal;
  <br/>
- `docker start <container_id>` - emit just the container id, not command output. Docker start will run the last running startup command with current container (so it can be overridden command). User won't be able to change this command anymore;
  <br/>
  <br/>
- `docker system prune` - remove all stopped containers and related files;
  <br/>
- `docker logs <container_id>` - emit all the logs that have been emitted from that container;
  <br/>
  <br/>
- `docker stop <container_id>` - stop the container, make it possible for that container to make some additional work to successfully finish, e.g. unsubscribe from events. But if container won't stop in 10 sec, docker will automatically issue KILL command;
  <br/>
- `docker kill <container_id>` - stop the container immediately, without any additional work;
  <br/>
  <br/>
- `docker exec -it <container_id> <command>` - execute additional command in a container, `it` add possibility to provide input inside of this container;
  <br/>
- `docker exec -it <container_id> sh` - get the full terminal access inside the context of the running container (sh should be installed inside the container);
  <br/>
- `docker run -it <container_name> sh` - run `sh` immediately after container startup;
  <br/>
  <br/>
- `docker build .` - create an image based on Dockerfile, emit image id;

> Note: Upon execution of each instruction a temporary container is created, When execution is finished, this container snapshot is saved and passed to the next step as a base image.

- `docker build -t <docker_id>/<project_name>:<version> .` - e.g. `docker build -t consrluk/redis:latest .` - tag the image that is being created. After that we can run `docker run conrsluk/redis` to create a container;

> Note: run redis-cli inside this running container:
>
> 1. `docker ps` - get container id;
> 2. `docker exec -it <container_id> sh`
> 3. `redis-cli`
> 4. `set <var_name> <value>`;
> 5. `get <var_name>`;

- `docker build -f <docker_file_name> .` - specify the file that is going to be used to build the image;
  <br/>
- `docker commit -c "CMD '<startup_command>'" <running_or_stopped_container_id>` - create an image based on container. `-c` add possibility to provide default startup command. So we can run container, make some changes in fly and then create an image with these changes. Emit image id. Then we can run a container using this id: `docker run <image_id>`;
  <br/>
  <br/>
- `docker run -p <computer_port>:<container_port> <image_id(/image_name)>` - specify that incoming traffic to computer port should be redirected to container port;
  <br/>
  <br/>
- `docker-compose up` - run all images inside docker-compose.yml;
  <br/>
- `docker-compose up --build` - rebuild end run all images inside docker-compose.yml;
  <br/>
- `docker-compose up -d` - start a group of containers in the background, so current terminal remains available for other commands;
  <br/>
- `docker-compose down` - stop all running containers at the same time;
  <br/>
- `docker-compose ps` - get status of running containers inside compose file. Should be checked in the working directory where `docker-compose.yml` is placed;
  <br/>
  <br/>
- `docker run -v <not_overridden_folder_path_in_the_container> -v <local_folder_path>:<container_folder_path> <image_id(/image_name)>` - set up volumes or folders mapping to create a references from container files to local files, so that we can see changes without rebuilding the app, e.g. `docker run -p 3000:3000 -v /home/node/app/node_modules -v ~/learn-docker-kubernetes/frontend:/home/node/app conrsluk/frontend`;

> Note: Working with project in WSL2:
>
> 1. To open WSL2 operating system, type `wsl` in the terminal;
> 2. In the WSL2 terminal switch to your root user directory by running `cd ~` ;
> 3. Run `explorer.exe .` to open up a file browser within WSL2;
> 4. Move the project directory into the file browser window;
> 5. Your project path should now look like this: `/home/<USER>/learn-docker-kubernetes/frontend`;

- `docker attach <container_id>` - Attach local standard input, output, and error streams to a primary process (with process id of 1) of running container. So using command `npm run test` this process is just `npm` and not `tests.js` or some secondary process that was started by `npm`;
  <br/>
