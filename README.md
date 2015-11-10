# paste
[![License](https://img.shields.io/github/license/JoeBiellik/paste.svg)](LICENSE.md)
[![Node.js Version](https://img.shields.io/badge/node.js-%3E=_4.0-red.svg)](https://nodejs.org/)
[![Release Version](https://img.shields.io/github/release/JoeBiellik/paste.svg)](https://github.com/JoeBiellik/paste/releases)
[![Dependencies](https://img.shields.io/david/JoeBiellik/paste.svg)](https://david-dm.org/JoeBiellik/paste)

Simple [Node.js](https://nodejs.org/) pastebin built with [Koa](http://koajs.com/), [MongoDB](https://www.mongodb.org/), [Jade](http://jade-lang.com/), [Bootstrap 4](http://v4-alpha.getbootstrap.com/) and [Prism.js](http://prismjs.com/).

Try it out at [paste.fyi](http://paste.fyi/)

## Features
* Clean code thanks to ES7 async/await, [Koa](http://koajs.com/) and [Babel](https://babeljs.io/)
* Full syntax highlighting via [Prism.js](http://prismjs.com/)
* Short URLs via [shortid](https://github.com/dylang/shortid), e.g. `NyQO9puMe`
* Full support for CLI requests with [curl](http://curl.haxx.se/) etc
* Automatic and configurable paste expiry
* Runs fully containerized with [Docker](https://www.docker.com/) and [Vagrant](https://www.vagrantup.com/)
* Simple and responsive UI built with [Bootstrap 4](http://v4-alpha.getbootstrap.com/)

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
  docker-compose up -d
  ```

5. Start app and watch for changes:
  ```sh
  npm run watch
  ```

## Deployment
1. Configure `config/docker.json` with any custom settings

2. Start the production database and Node.js server:
  ```sh
  docker-compose -f production.yml up -d
  ```
