exports = async function(arg){
  // URL Components
  const baseUrl = "cloud.mongodb.com/api/atlas/v1.0/"
  const groupId = "groups/61ae0f46078f8128ffc6d46b/"
  const processId = "processes/cloudwatchsync-shard-00-02.pvy7q.mongodb.net:27017/"
  const digest = "bthchpwu:9fc1d33b-b674-45a2-87f5-8a14e10c2915"
  
  // Construct URL
  const url = 'https://' + digest + '@' + baseUrl + groupId + processId + 'measurements?granularity=PT1M&period=PT5M'
  const req = await context.http.get({
    url: url,
    headers: {
      "Content-Type": ["application/json"],
      "Accept": ["application/json"]
    },
    digestAuth: true
  })
  
  // Built-in ExtendedJSON parser
  data = req.body.text()
  return_data = EJSON.parse(data)
  
  // Send to metrics collection for Realm Trigger
  var collection = context.services.get("mongodb-atlas").db("monitoring").collection("metrics");
  return_data.measurements.forEach(item => {
    console.log(JSON.stringify(item));
    collection.insertOne(item);
  });
};