# paste
[![License](https://img.shields.io/github/license/JoeBiellik/paste.svg)](LICENSE.md)
[![Release Version](https://img.shields.io/github/release/JoeBiellik/paste.svg)](https://github.com/JoeBiellik/paste/releases)
[![Dependencies](https://img.shields.io/david/JoeBiellik/paste.svg)](https://david-dm.org/JoeBiellik/paste)

> Simple [Node.js](https://nodejs.org/) pastebin built with [Koa](https://koajs.com/), [MongoDB](https://www.mongodb.com/), [Jade](http://jade-lang.com/), [Bootstrap](https://getbootstrap.com/) and [Prism.js](https://prismjs.com/).

Try it out at [paste.fyi](https://paste.fyi/)

## Features
* Full syntax highlighting via [Prism.js](https://prismjs.com/)
* Automatic and configurable paste expiry
* Full support for CLI requests with [curl](https://curl.haxx.se/), [Wget](https://www.gnu.org/software/wget/) etc
* <kbd>CTRL</kbd>+<kbd>Enter</kbd> hotkey for quick paste submission
* Short URLs via [shortid](https://github.com/dylang/shortid), e.g. `NyQO9puMe`
* Textarea grows to fit content via [autosize.js](https://github.com/jackmoore/autosize)
* Simple and responsive UI built with [Bootstrap](https://getbootstrap.com/)
* Clean code thanks to ES7 async/await and [Koa](https://koajs.com/)
* Runs fully containerized with [Docker](https://www.docker.com/)

## Usage
```sh
# Simple paste
$ echo 'Hello World' | curl -F 'paste=<-' http://paste.fyi
http://paste.fyi/N15FNVqfg

# wget or any other tool is fine too:
$ wget --post-data 'paste=Hello from wget' -qO- http://paste.fyi

# Either form or multipart data is accepted:
$ curl -d 'paste=Sent as multipart' http://paste.fyi

# Specify the syntax to highlight:
$ git diff README.md | curl -F 'paste=<-' -F 'highlight=diff' http://paste.fyi
```

## Development
1. Clone this repo:
  ```sh
  git clone https://github.com/JoeBiellik/paste.git && cd paste
  ```

2. Install dependencies:
  ```sh
  docker-compose run -e NODE_ENV=dev --rm --no-deps app npm install
  ```

3. Start app and watch for changes:
  ```sh
  docker-compose run -e NODE_ENV=dev --rm --service-ports app npm run watch
  ```

## Deployment
1. Configure `config/docker.json` with any custom settings

2. Start the production database and Node.js server:
  ```sh
  docker-compose up
  ```
