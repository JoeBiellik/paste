# paste
[![License](https://img.shields.io/github/license/JoeBiellik/paste.svg)](LICENSE.md)
[![Release Version](https://img.shields.io/github/release/JoeBiellik/paste.svg)](https://github.com/JoeBiellik/paste/releases)
[![Dependencies](https://img.shields.io/david/JoeBiellik/paste.svg)](https://david-dm.org/JoeBiellik/paste)

> Simple [Node.js](https://nodejs.org/) pastebin built with [Koa](http://koajs.com/), [MongoDB](https://www.mongodb.org/), [Jade](http://jade-lang.com/), [Bootstrap 4](http://v4-alpha.getbootstrap.com/) and [Prism.js](http://prismjs.com/).

Try it out at [paste.fyi](http://paste.fyi/)

## Features
* Clean code thanks to ES7 async/await and [Koa v2](http://koajs.com/)
* Full syntax highlighting via [Prism.js](http://prismjs.com/)
* <kbd>CTRL</kbd>+<kbd>Enter</kbd> hotkey for quick paste submission
* Short URLs via [shortid](https://github.com/dylang/shortid), e.g. `NyQO9puMe`
* Full support for CLI requests with [curl](http://curl.haxx.se/) etc
* Textarea grows to fit content via [autosize.js](https://github.com/jackmoore/autosize)
* Automatic and configurable paste expiry
* Runs fully containerized with [Docker](https://www.docker.com/) and [Vagrant](https://www.vagrantup.com/)
* Simple and responsive UI built with [Bootstrap 4](http://v4-alpha.getbootstrap.com/)

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

2. Start the virtual machine and connect:
  ```sh
  vagrant up
  vagrant ssh
  ```

4. Install dependencies:
  ```sh
  npm install
  ```

5. Start MongoDB:
  ```sh
  docker-compose up -d db
  ```

5. Start app and watch for changes:
  ```sh
  npm run watch
  ```

## Deployment
1. Configure `config/docker.json` with any custom settings

2. Start the production database and Node.js server:
  ```sh
  docker-compose up
  ```
