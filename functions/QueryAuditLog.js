exports = function(arg){
  
  const zlib = require('zlib');
  
  const req = context.http.get({
    url: "https://bthchpwu:9fc1d33b-b674-45a2-87f5-8a14e10c2915@cloud.mongodb.com/api/atlas/v1.0/groups/61ae0f46078f8128ffc6d46b/clusters/cloudwatchsync-shard-00-00.pvy7q.mongodb.net/logs/mongodb-audit-log.gz",
    headers: {
      "Accept": ["application/gzip"],
    },
    digestAuth: true
  }).then(res => {
    console.log(res.body.text())
    zlib.gunzip(res.body.text(), (err, buffer) => {
      console.log("Decompressed data: ", buffer.toString('utf8'));
    });
  })
};