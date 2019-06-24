# WebGRLC.js

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/KorkyMonster/WebGRLC.js/graphs/commit-activity)

An easy script to mine Allium-based coins in a web browser.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need to move the files in this repository onto a webserver to serve them. `test.html` does not have to be served, 
it is only a test of whether this script works.

The deployment of this project needs a web server and a proxy to transfer data between raw TCP sockets and WebSockets. This guide will assume your web server is set up correctly.

All communication with the mining pool is done in the browser; however, due to the limitations of the browser environment, this communication cannot occur directly. The browser first sends data to a proxy, which forward the message to the mining pool, and similarly for the reverse.

wsProxy is a convient proxy server that can help us do this: https://github.com/herenow/wsProxy

```
$ npm install wsproxy -g

$ wsproxy -p 8080 -t 1
[Status]: Starting wsProxy on port 8080...

```

### Installing

Now that we have our communications proxy up, deploy `WebGRLC.js`, `allium.js`, `allium.wasm`, `test.html`, and `worker.js` to your webserver.

If you want to test whether this script works right away using `test.html`, the following steps are necessary.
We need to change a line in our test.html to use the proxy server that was set up. Look at line 16 in `test.html`

```miner = new WebGRLC({proxyUrl: 'ws://webmine.tuxtoke.life:8080/', ...```

Change "webmine.tuxtoke.life:8080" to the ip address and port of your proxy server. You're ready to go! 

## Running the tests

Try to navigate the test.html on your webserver. Click on "New miner" and then click "Connect". 
Moniter the console for any errors. You should see logging about the creation of threads and stratum communications with the mining pool.

If all goes well, you should see a number indicating the hashing speed of the web miner.

![Webminer running! Success!](http://i.imgur.com/OoBePce.png)

## Deployment

It is recommended that you don't mine on mobile devices, as it will drain battery rapidly.

**Use this responsibly!**

```
var options = {proxyUrl: 'ws://webmine.tuxtoke.life:8080/', 
      poolUrl: 'grlcgang.com:3333', 
      username: 'KorkyMonster.testing', 
      password: 'x', 
      authorizationFn: function (success){console.log("Authorization: " + success)}, 
      newJobFn: function(jobId){console.log("New job, id#: " + jobId)}, 
      newDiffFn: function(diff){console.log("Difficulty set to " + diff)} 
};

miner = new WebGRLC(options);

miner.connect();
```

`poolUrl`, `username`, and `password` need to filled in with information to connect and authenticate with a mining pool. Typically
"x" is an appropriate password for most mining pools, but some pools may require a customized password, which is why the option
exists. Functions should be passed in to `authorizationFn`, `newJobFn`, and `newDiffFn`. For example, you may want to use these options
to manage a graphical interface. 
- `authorizationFn` will recieve either `true` or `false` representing authorization status with the pool.
- `newJobFn` will recieve either the id of a new job when it is recieved from a mining pool.
- `newDiffFn` will recieve either the difficulty associated with a new job once it is recieved from a mining pool.

`miner.connect()` should be run to initiate stratum connection.

## Built With

* [wsProxy](https://github.com/herenow/wsProxy) - wsProxy is a TCP raw socket/WebSocket proxy that allows socket access to the browser.
* [WASM](https://webassembly.org/) - WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine. 
* A lot of love!  ❤️ ❤️ ❤️

## Authors

* **Ananth Vivekanand** - [KorkyMonster](https://github.com/KorkyMonster)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Thanks to Kryptonite, who provided WebAssembly compilation instructions for the Allium algorithm!
