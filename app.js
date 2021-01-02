var redis = require('redis');
var client = redis.createClient(); //creates a new client

client.on('connect', function () {
    console.log('connected');
})

/*** 
 * Simply key-value pair store
 * 
***/
client.set('framework', 'AngularJS', function (err, reply) {
    console.log(reply);
});

client.get('framework', function (err, reply) {
    console.log(reply);
});

/*** 
 * end
 * 
***/

/*** 
 * Store hashes(object) 
 * 
***/

client.hmset('frameworks1', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');

/*
 * Or
*/

// client.hmset('frameworks', {
//     'javascript': 'AngularJS',
//     'css': 'Bootstrap',
//     'node': 'Express'
// });

client.hgetall('frameworks1', function (err, object) {
    console.log(object);
});

/***
 * end
 *
***/


/*** 
 * Store array
 * 
 * rpush() and lpush() store array. First element of array will be key of stored object which is called frameworks2.
***/

client.rpush(['frameworks2', 'angularjs', 'backbone'], function(err, reply) {
    console.log(reply); //prints 2
});

client.lrange('frameworks2', 0, -1, function(err, reply) {
    // get all items within array
    console.log(reply); // ['angularjs', 'backbone']
});

/***
 * end
 *
***/


/*** 
 * delete given keys from memory 
 * 
*/

// client.del('frameworks2', function(err, reply) {
//     console.log(reply);
// });

// client.del('frameworks1', 'frameworks2');

// Or

// client.del(['frameworks1', 'frameworks2']);

/***
 * end
 *
***/

/*** 
 * Clear all keys  
*/

client.flushdb( function (err, succeeded) {
    console.log(succeeded); // will be true if successfull
});

/***
 * end
 *
***/

/***
 * Basic set type
 * Sets not only same with array but also makes items unique.
 */

client.sadd(['tags', 'angularjs', 'angularjs', 'backbonejs', 'emberjs', 'emberjs'], function(err, reply) {
    console.log(reply); // 3
});


client.smembers('tags', function(err, reply) {
    console.log(reply); // [ 'backbonejs', 'emberjs', 'angularjs' ]
});

/***
 * end
 *
***/

/***
 * Is key exist in db 
 * 
 */

client.exists('key', function(err, reply) {
    //if exist reply = 1 else reply = 0
    if (reply === 1) {
        console.log('exists');
    } else {
        console.log('doesn\'t exist');
    }
});

/***
 * end
 *
***/


/***
 * 
 */
client.set('has_expiresTime', 'value',function () {
console.log("has_expiresTime will delete after 5second"); 
});
client.expire('has_expiresTime', 5);

const getHas_expiresTime = () => client.get('has_expiresTime' ,function (err, reply) {
    if(!err){
        console.log("has_expiresTime: " + reply)
    }else {
        console.log("has_expiresTime: "+ err)
    }
})

getHas_expiresTime();
 
setTimeout(() => {
    getHas_expiresTime();
}, 6000);


setTimeout(() => {
    // No further commands will be processed
    client.end(true);
}, 6500);
