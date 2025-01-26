DOCKER_IMAGE_NAME=cancer-viz-app

build:
	docker build -t $(DOCKER_IMAGE_NAME) -f DockerfileLocal .

run:
	docker run -d -p 3000:3000 --name $(DOCKER_IMAGE_NAME) $(DOCKER_IMAGE_NAME)

bash:
	docker exec -it $(DOCKER_IMAGE_NAME) bash
