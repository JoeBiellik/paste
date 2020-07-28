# paste
[![License](https://img.shields.io/github/license/JoeBiellik/paste.svg)](LICENSE.md)
[![Release Version](https://img.shields.io/github/release/JoeBiellik/paste.svg)](https://github.com/JoeBiellik/paste/releases)
[![Dependencies](https://img.shields.io/david/JoeBiellik/paste.svg)](https://david-dm.org/JoeBiellik/paste)

> Simple [Node.js](https://nodejs.org/) pastebin built with [Koa](https://koajs.com/), [MongoDB](https://www.mongodb.com/), [Pug](https://pugjs.org/), [Bootstrap](https://getbootstrap.com/) and [Prism.js](https://prismjs.com/).

Try it out at [paste.fyi](https://paste.fyi/)

## Features
* Full syntax highlighting via [Prism.js](https://prismjs.com/)
* Automatic and configurable paste expiry
* Full support for CLI requests with [curl](https://curl.haxx.se/), [Wget](https://www.gnu.org/software/wget/) etc
* <kbd>CTRL</kbd>+<kbd>Enter</kbd> hotkey for quick paste submission
* Short and readable URLs via [nanoid](https://github.com/ai/nanoid), e.g. `/qNGDwRyx`
* Textarea grows to fit content via [autosize.js](https://github.com/jackmoore/autosize)
* Runs fully containerized with [Docker](https://www.docker.com/)

## CLI Usage
```sh
# Simple paste
$ echo 'Hello World' | curl -F 'paste=<-' paste.fyi
http://paste.fyi/qNGDwRyx

# Either form, multipart or raw text data is accepted
$ curl -F 'paste=Sent as form data' https://paste.fyi
$ curl -d 'paste=Sent as multipart data' https://paste.fyi
$ curl -H "Content-Type: text/plain" -d 'Sent as raw text' https://paste.fyi

# Wget or any other tool is fine too
$ wget --post-data 'paste=Hello from Wget' -qO- https://paste.fyi

# Upload a file
$ curl -F 'paste=@path/to/file.txt' https://paste.fyi

# Specify the expiry time in seconds
$ curl -F 'paste=2 minutes' -F 'expire=120' https://paste.fyi
$ curl -F 'paste=2 minutes' https://paste.fyi/?expire=120

# Specify the syntax to highlight
$ git diff README.md | curl -F 'paste=<-' https://paste.fyi/?diff
$ curl -F 'paste=@path/to/file.diff' -F 'highlight=diff' https://paste.fyi

# Redirect to content
$ curl -F 'paste=My paste' https://paste.fyi/?redirect
My paste

# Combined options
$ curl -F 'paste=My paste' -F 'expire=60' -F 'highlight=shell' https://paste.fyi
$ curl -F 'paste=My paste' 'https://paste.fyi/?expire=120&shell'
```

## Development
1. Clone this repo:
  ```sh
  git clone https://github.com/JoeBiellik/paste.git && cd paste
  ```

2. Install dependencies:
  ```sh
  docker-compose run -e NODE_ENV= --rm --no-deps app npm install
  ```

3. Start the app and watch for changes:
  ```sh
  docker-compose run -e NODE_ENV= --rm --service-ports app npm run watch
  ```

## Deployment
1. Follow the first two development steps.

2. Configure `config/docker.json` with any custom setting overrides

3. Configure `docker-compose.yml` with Docker options and ports to use

4. Start the production database and Node.js server:
  ```sh
  docker-compose up
  ```
