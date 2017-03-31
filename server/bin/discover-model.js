var path = require('path');
var fs = require('fs');
var loopback = require('loopback');

var datasources = require('../datasources.json');
var fundrayzDbConfig = datasources['fundrayz-db'];

var fundrayzDb = loopback.createDataSource(fundrayzDbConfig['name'], fundrayzDbConfig);

var outputPath = path.resolve(__dirname, '../../common/models');

function writeSchema(err, schema) {
  if(schema) {
    console.log("Auto discovery success: " + schema.name);
    var outputName = outputPath + "/" + schema.name + ".json";
    fs.writeFile(outputName, JSON.stringify(schema, null, 2), function(err) {
      if(err) {
        console.err(err);
      } else {
        console.log("JSON saved to " + outputName);
      }
    });
  }
  if(err) {
    console.err(err);
  }
}

fundrayzDb.discoverSchema('bid', { relations: true }, writeSchema);
fundrayzDb.discoverSchema('contact', { relations: true }, writeSchema);
fundrayzDb.discoverSchema('donation', { relations: true }, writeSchema);
fundrayzDb.discoverSchema('event', { relations: true }, writeSchema);
fundrayzDb.discoverSchema('item', { relations: true }, writeSchema);
fundrayzDb.discoverSchema('item_donation', { relations: true }, writeSchema);
fundrayzDb.discoverSchema('organization', { relations: true }, writeSchema);
fundrayzDb.discoverSchema('payment', { relations: true }, writeSchema);
fundrayzDb.discoverSchema('purchase', { relations: true }, writeSchema);
fundrayzDb.discoverSchema('role_permission', { relations: true }, writeSchema);
fundrayzDb.discoverSchema('supporter', { relations: true }, writeSchema);
fundrayzDb.discoverSchema('user_info', { relations: true }, writeSchema);
fundrayzDb.discoverSchema('user_role', { relations: true }, writeSchema);
fundrayzDb.discoverSchema('work_schedule', { relations: true }, writeSchema);
