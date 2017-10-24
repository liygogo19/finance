//var jsSHA = require('jssha');
var request = require('superagent');
var crypto = require('crypto')

function Weixin () {
    this.appId = 'wxe8cf98fc1cfca97f';
    this.jsapiTicket = "";
}

Weixin.prototype.config=function (url,apiList) {
    this.sign(url,function (ret) {
        if(apiList){
            ret.apiList = apiList;
        }
        else {
            console.log('ApiList can not be empty!');
        }
        console.log(ret,'retretretretretret');
        return ret;
    });
}

Weixin.prototype.sign = function (url, cb) {
    var self = this;
    this.getTicket(function(jsapiTicket) {
        var ret = {
            jsapi_ticket: jsapiTicket,
            nonceStr: createNonceStr(),
            timestamp: createTimestamp(),
            url: url,
        };
        var string = raw(ret);
        const hashCode = crypto.createHash('sha1');
        var resultCode = hashCode.update(string,'utf8').digest('hex');
        ret.signature = resultCode;
        ret.appId = self.appId;
        ret.debug = true;

        delete ret.jsapi_ticket;
        delete ret.url;
        console.log(ret,'retretret');
        cb(ret);
    });

};

Weixin.prototype.getTicket = function (cb) {
    var self = this;
    if(this.jsapiTicket) return cb(this.jsapiTicket);

        var url = 'http://agent.zhaofangroup.com/vendor/weixin/index.php?r=getAccessTicket';
        request.get(url).then(function(res) {
            console.log(res);
            console.log(res,'ticket api');
            if(res) {
                self.jsapiTicket = res.text;
                console.log('self.jsapiTicket',self.jsapiTicket)
                cb && cb(self.jsapiTicket);
            } else {
                console.log("something wrong");
            }
        });
}

function createNonceStr() {
    return Math.random().toString(36).substr(2, 15);
};

function createTimestamp() {
    return parseInt(new Date().getTime() / 1000) + '';
};

function raw(args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function (key) {
        newArgs[key.toLowerCase()] = args[key];
    });

    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
};

module.exports = Weixin;
