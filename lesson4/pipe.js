var fs = require('fs');
console.log(process.argv[2], '->', process.argv[3])
var readStream = fs.createReadStream(process.argv[2]);
var writeStream = fs.createWriteStream(process.argv[3]);

// readStream.on('data', function(chunk) { writeStream.write(chunk);});
// readStream.on('end', function() { writeStream.end();});
// readStream.on('error', function(err) {console.log('read err', err);})
// writeStream.on('error', function(err) {console.log('write err', err);})

readStream.pipe(writeStream);