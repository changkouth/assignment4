function Fetch() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 0 && arguments[1] !== undefined ? arguments[1] : {};
    var xhttp = new XMLHttpRequest();
    var onThen = new Array();
    var onError = new Array();
    var onFinally = new Array();
    var method = options.method || "GET";
    var context = this;

    xhttp.onreadystatechange = function () {
        var temp = this;
        if (this.readyState == 4 && this.status == 200) {
            context.onThen.forEach(function (cb) {
                cb(temp);
            });
            context.onFinally.forEach(function (cb) {
                cb(temp);
            });
        } else if (this.readyState == 4 && this.state != 200) {
            context.onError.forEach(function (cb) {
                cb(temp);
            });
            context.onFinally.forEach(function (cb) {
                cb(temp);
            });
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
};

Fetch.prototype.then = function(thenFunction) {
    this.onThen.push(thenFunction);
    return this;
}
Fetch.prototype.error = function(errorFunction) {
    this.onError.push(errorFunction);
    return this;
}
Fetch.prototype.finally = function(finallyFunction) {
    this.onFinally.push(finallyFunction);
    return this;
}


// Get request
var myFetch4 = new Fetch('https://jsonplaceholder.typicode.com/todos/1');
myFetch4.then(function(data) {
    console.log(data);
}).then(function(res) {
    console.log(res);
}).catch(function(err){ 
    console.log("catch", err);
})


/*
// Post request
const headers = new Headers();
headers.append('Content-Type', 'application/json');
var myFetch = new Fetch('https://jsonplaceholder.typicode.com/posts', {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
        title: "foo",
        body: 'bar',
        userId: 1
    })
});
myFetch.then(function(data) {
    console.log(data);
}).then(function(res) {
    console.log(res.json());
}).catch(function(err){ 
    console.log(err);
})


var myFetch2 = new Fetch('https://jsonplaceholder.typicode.com/posts/5', {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
        title: "custom",
        body: 'this is for testing'
    })
});
myFetch2.then(function(data) {
    console.log(data);
}).then(function(res) {
    console.log(res);
}).catch(function(err){ 
    console.log(err);
})

// Delete request
var myFetch3 = new Fetch('https://jsonplaceholder.typicode.com/users/2', {
    method: 'DELETE',
    headers: headers,
});
myFetch3.then(function(data) {
    console.log(data);
}).then(function(res) {
    console.log(res);
}).catch(function(err){ 
    console.log(err);
})
*/

