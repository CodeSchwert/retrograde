# Retrograde

See [`example-response.json`](example-response.json) for an example of what is returned from the API.

Alternatively, head over to the [OpenAPI online editor](https://editor.swagger.io/) and load the spec from [openapi.yml](openapi.yml) to checkout the API spec/docs.

## Getting Started

```shell
# fetch the latest planet retrograde data
yarn run scrape

# start the development server
yarn run dev
```

View the local OpenAPI specification - [http://localhost:5000/openapi](http://localhost:5000/openapi)

## Docker Container

Instructions for building and running the container.

```shell
# Build the container image
docker build -t codeschwert/retrograde:latest .

# Launch the container
docker run --name retrograde --rm -d -p 5000:5000 codeschwert/retrograde
```
