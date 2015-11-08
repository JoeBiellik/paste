# paste
[![License](https://img.shields.io/github/license/JoeBiellik/paste.svg)](http://opensource.org/licenses/MIT)
[![Release Version](https://img.shields.io/github/release/JoeBiellik/paste.svg)](https://github.com/JoeBiellik/paste/releases)
[![Dependencies](https://img.shields.io/david/JoeBiellik/paste.svg)](https://david-dm.org/JoeBiellik/paste)
[![Node.js Version](https://img.shields.io/badge/node.js-%3E=_0.11-red.svg)](https://nodejs.org/download/)

Simple [Node.js](https://nodejs.org/) pastebin built with [Koa](http://koajs.com/), [MongoDB](https://www.mongodb.org/), [Jade](http://jade-lang.com/), [Bootstrap 4](http://v4-alpha.getbootstrap.com/) and [Prism.js](http://prismjs.com/).

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

5. Start app and reload on change:
  ```sh
  npm run watch
  ```
