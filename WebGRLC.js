function convertUint8ArrayToBinaryString(u8Array) {
    var i, len = u8Array.length,
        b_str = "";
    for (i = 0; i < len; i++) {
        b_str += String.fromCharCode(u8Array[i]);
    }
    return b_str;
}

function hex2Buf(str) {
    var r = new Uint8Array(str.length / 2);
    for (var i = 0, x = str.length, k = 0; i < x; i += 2, k++) {
        r[k] = parseInt(str.substr(i, 2), 16);
    }
    return r;
}

function doublesha(hexStr) {
    var hexStrBuf = hex2Buf(hexStr);
    var hexStrBin = convertUint8ArrayToBinaryString(hexStrBuf);
    hexStrBin = CryptoJS.enc.Latin1.parse(hexStrBin);
    var sha1 = CryptoJS.SHA256(hexStrBin);
    sha1 = sha1.toString(CryptoJS.enc.Latin1);
    sha1 = CryptoJS.enc.Latin1.parse(sha1);
    var sha2 = CryptoJS.SHA256(sha1);
    var dhash = sha2.toString();
    return dhash;
}
const changeEndianness = (string) => {
    const result = [];
    let len = string.length - 2;
    while (len >= 0) {
        result.push(string.substr(len, 2));
        len -= 2;
    }
    return result.join('');
}
const changePrevhashEndianness = (string) => {
    pieces = string.match(/.{1,8}/g);
    for (let i = 0; i < pieces.length; i++) {
        pieces[i] = changeEndianness(pieces[i]);
    }
    pieces = pieces.join('');
    return pieces;
}

var CryptoJS=CryptoJS||function(e,t){var n={},r=n.lib={},i=function(){},s=r.Base={extend:function(e){i.prototype=this;var t=new i;e&&t.mixIn(e);t.hasOwnProperty("init")||(t.init=function(){t.$super.init.apply(this,arguments)});t.init.prototype=t;t.$super=this;return t},create:function(){var e=this.extend();e.init.apply(e,arguments);return e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}},o=r.WordArray=s.extend({init:function(e,n){e=this.words=e||[];this.sigBytes=n!=t?n:4*e.length},toString:function(e){return(e||a).stringify(this)},concat:function(e){var t=this.words,n=e.words,r=this.sigBytes;e=e.sigBytes;this.clamp();if(r%4)for(var i=0;i<e;i++)t[r+i>>>2]|=(n[i>>>2]>>>24-8*(i%4)&255)<<24-8*((r+i)%4);else if(65535<n.length)for(i=0;i<e;i+=4)t[r+i>>>2]=n[i>>>2];else t.push.apply(t,n);this.sigBytes+=e;return this},clamp:function(){var t=this.words,n=this.sigBytes;t[n>>>2]&=4294967295<<32-8*(n%4);t.length=e.ceil(n/4)},clone:function(){var e=s.clone.call(this);e.words=this.words.slice(0);return e},random:function(t){for(var n=[],r=0;r<t;r+=4)n.push(4294967296*e.random()|0);return new o.init(n,t)}}),u=n.enc={},a=u.Hex={stringify:function(e){var t=e.words;e=e.sigBytes;for(var n=[],r=0;r<e;r++){var i=t[r>>>2]>>>24-8*(r%4)&255;n.push((i>>>4).toString(16));n.push((i&15).toString(16))}return n.join("")},parse:function(e){for(var t=e.length,n=[],r=0;r<t;r+=2)n[r>>>3]|=parseInt(e.substr(r,2),16)<<24-4*(r%8);return new o.init(n,t/2)}},f=u.Latin1={stringify:function(e){var t=e.words;e=e.sigBytes;for(var n=[],r=0;r<e;r++)n.push(String.fromCharCode(t[r>>>2]>>>24-8*(r%4)&255));return n.join("")},parse:function(e){for(var t=e.length,n=[],r=0;r<t;r++)n[r>>>2]|=(e.charCodeAt(r)&255)<<24-8*(r%4);return new o.init(n,t)}},l=u.Utf8={stringify:function(e){try{return decodeURIComponent(escape(f.stringify(e)))}catch(t){throw Error("Malformed UTF-8 data")}},parse:function(e){return f.parse(unescape(encodeURIComponent(e)))}},c=r.BufferedBlockAlgorithm=s.extend({reset:function(){this._data=new o.init;this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=l.parse(e));this._data.concat(e);this._nDataBytes+=e.sigBytes},_process:function(t){var n=this._data,r=n.words,i=n.sigBytes,s=this.blockSize,u=i/(4*s),u=t?e.ceil(u):e.max((u|0)-this._minBufferSize,0);t=u*s;i=e.min(4*t,i);if(t){for(var a=0;a<t;a+=s)this._doProcessBlock(r,a);a=r.splice(0,t);n.sigBytes-=i}return new o.init(a,i)},clone:function(){var e=s.clone.call(this);e._data=this._data.clone();return e},_minBufferSize:0});r.Hasher=c.extend({cfg:s.extend(),init:function(e){this.cfg=this.cfg.extend(e);this.reset()},reset:function(){c.reset.call(this);this._doReset()},update:function(e){this._append(e);this._process();return this},finalize:function(e){e&&this._append(e);return this._doFinalize()},blockSize:16,_createHelper:function(e){return function(t,n){return(new e.init(n)).finalize(t)}},_createHmacHelper:function(e){return function(t,n){return(new h.HMAC.init(e,n)).finalize(t)}}});var h=n.algo={};return n}(Math);(function(e){for(var t=CryptoJS,n=t.lib,r=n.WordArray,i=n.Hasher,n=t.algo,s=[],o=[],u=function(e){return 4294967296*(e-(e|0))|0},a=2,f=0;64>f;){var l;e:{l=a;for(var c=e.sqrt(l),h=2;h<=c;h++)if(!(l%h)){l=!1;break e}l=!0}l&&(8>f&&(s[f]=u(e.pow(a,.5))),o[f]=u(e.pow(a,1/3)),f++);a++}var p=[],n=n.SHA256=i.extend({_doReset:function(){this._hash=new r.init(s.slice(0))},_doProcessBlock:function(e,t){for(var n=this._hash.words,r=n[0],i=n[1],s=n[2],u=n[3],a=n[4],f=n[5],l=n[6],c=n[7],h=0;64>h;h++){if(16>h)p[h]=e[t+h]|0;else{var d=p[h-15],v=p[h-2];p[h]=((d<<25|d>>>7)^(d<<14|d>>>18)^d>>>3)+p[h-7]+((v<<15|v>>>17)^(v<<13|v>>>19)^v>>>10)+p[h-16]}d=c+((a<<26|a>>>6)^(a<<21|a>>>11)^(a<<7|a>>>25))+(a&f^~a&l)+o[h]+p[h];v=((r<<30|r>>>2)^(r<<19|r>>>13)^(r<<10|r>>>22))+(r&i^r&s^i&s);c=l;l=f;f=a;a=u+d|0;u=s;s=i;i=r;r=d+v|0}n[0]=n[0]+r|0;n[1]=n[1]+i|0;n[2]=n[2]+s|0;n[3]=n[3]+u|0;n[4]=n[4]+a|0;n[5]=n[5]+f|0;n[6]=n[6]+l|0;n[7]=n[7]+c|0},_doFinalize:function(){var t=this._data,n=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;n[i>>>5]|=128<<24-i%32;n[(i+64>>>9<<4)+14]=e.floor(r/4294967296);n[(i+64>>>9<<4)+15]=r;t.sigBytes=4*n.length;this._process();return this._hash},clone:function(){var e=i.clone.call(this);e._hash=this._hash.clone();return e}});t.SHA256=i._createHelper(n);t.HmacSHA256=i._createHmacHelper(n)})(Math);

let WebGRLC = class {
	constructor(options) {
		var {proxyUrl, poolUrl, username, password, authorizationFn, newJobFn, newDiffFn} = options;
		this.poolUrl = proxyUrl + poolUrl; //Ex: 'ws://47.187.209.186:8080/' + 'grlcgang.com:3333' <-- (ws/tcp bridge + mining pool)
		this.username = username;
		this.password = password;
		this.connect.bind(this);
		this.mining_work = {};
		this.authFn = authorizationFn;
		this.newJobFn = newJobFn;
		this.newDiffFn = newDiffFn;
		this.worker_limit = 4;
		this.standby_workers = [];
		this.workers = [];
	for (var i = 0; i < this.worker_limit; i++) {
	    this.standby_workers.push(new Worker('worker.js'));
		console.log(this.standby_workers);
	}
	}
	connect() {
		let messageDecoder = (data) => {
			let decoder = new FileReader(); //Used to decode blobs sent by mining pool
			decoder.onload = () => {
				var result = decoder.result.split("\n");
				for (var message of result) {
					if(message != "") {					
						this.processData(message);
					}
				}
			}
			decoder.readAsText(data);
		}
		let socket = new WebSocket(this.poolUrl);
                socket.addEventListener('message', function(event) {
		     messageDecoder(event.data);
       	        });
       	        socket.addEventListener('open', function(event) {
           	     //keepAlive();
           	     socket.send('{"id": "mining.subscribe", "method": "mining.subscribe", "params": []}\n');
                });
		this.socket = socket;
		this.messageDecoder = messageDecoder;
	}
	processData(data) {
		data = JSON.parse(data.replace(/\r?\n|\r/g));
		console.log(data);
		    if (data.id == "mining.subscribe") {
		        this.mining_work.extranonce_1 = data.result[1];
		        this.mining_work.extranonce_2 = "00000000"; //We can decide any value we want here
		        this.socket.send('{"params": ["' + this.username + '", "' + this.password + '"], "id": "mining.authorize", "method": "mining.authorize"}\n');
		        console.log('SENT: ', '{"params": ["' + this.user + '", "' + this.password + '"], "id": "mining.authorize", "method": "mining.authorize"}\n');
		    }
		    if (data.id == "mining.authorize") {
		        if (data.result && this.authFn) {
		            this.authFn(true); //Allows user to define custom actions on authorization
		        }
		        if (!data.result && this.authFn) {
		            this.authFn(false);
		        }
		    }
		    if (data.method == "mining.notify") {
			//console.log("New job, id#: " + data.params[0]);
			this.newJobFn(data.params[0], data); //Allows to user to define custom actions on mining work
		        this.processWork(data);
		    }
		    if (data.method == "mining.set_difficulty") {
		        this.mining_work.diff = data.params[0];
			this.newDiffFn(data.params[0]); //Allows to user to define custom actions on mining difficulty
		    }
	}
	processWork(message, is_forced) {
		if(message.params[8] || is_forced) {
		    let job_id = message.params[0]; //Unpacking the data from the pool message
		    let prevhash = message.params[1];
		    let coinb1 = message.params[2];
		    let coinb2 = message.params[3];
		    let merkle_branches = message.params[4];
		    let version = message.params[5];
		    let nbits = message.params[6];
		    let ntime = message.params[7];
		    let clean_jobs = message.params[8];
			let coinbase = coinb1 + this.mining_work.extranonce_1 + this.mining_work.extranonce_2 + coinb2;
			let merkle_root = doublesha(coinbase);
               		 for (let i = 0; i < merkle_branches.length; i++) {
                  	  merkle_root = doublesha(merkle_root + merkle_branches[i]);
               		 }
			
		        version = changeEndianness(version); //Now we need to convert endianness
		        prevhash = changePrevhashEndianness(prevhash);
		        let big_ntime = ntime;
		        ntime = changeEndianness(ntime);
		        nbits = changeEndianness(nbits);
		for (var i = 0; i < this.worker_limit; i++) {
		    console.log("Worker was made");
		    this.standby_workers[i].postMessage([version, prevhash, merkle_root, ntime, nbits, this.mining_work.diff]);
		    this.workers.push(this.standby_workers[i]);
                    this.workers[i].onmessage = (e) => {
                        if (e.data.submit) {
                            this.socket.send('{"id": "mining.submit", "method": "mining.submit", "params": ["KorkyMonster.testing", "' + job_id + '", "00000000", "' + big_ntime + '", "' + (e.data.nonce).toString(16) + '"]}\n');
                        } else if (e.data.reportHashrate) {
                            e.srcElement.hashrate = (250 * ( 1000 / (e.timeStamp - e.srcElement.timestamp)));
                            e.srcElement.timestamp = e.timeStamp;
                        }
                    }
		}
		        if (!(this.standby_workers.length == 0)) {
                while (this.standby_workers[0]) {
                    this.standby_workers.shift();
                }
            }
		for (var i = 0; i < this.worker_limit; i++) {
		   this.standby_workers.push(new Worker('worker.js'));
		}
		}
	}
	get hashrate() {
		let total_hashrate = 0;
		for (var worker of this.workers) {
			total_hashrate += worker.hashrate;
		}
		return total_hashrate;
	}
}