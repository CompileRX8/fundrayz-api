import * as path from "path"
import * as fs from "fs"
import * as loopback from "loopback"

import * as dataSourceConfigs from "../datasources.json"

let fundrayzDbConfig = dataSourceConfigs["fundrayz-db"];

let fundrayzDb = loopback.createDataSource(fundrayzDbConfig.name, fundrayzDbConfig);

let outputPath = path.resolve(__dirname, '../../common/models');

let writeSchema = (schema) => {
  if(schema) {
    console.log(`Auto discovery success: ${schema.name}`);
    let outputName = `${outputPath}/${schema.name}.json`;
    fs.writeFile(outputName, JSON.stringify(schema, null, 2), function(err) {
      if(err) {
        console.error(err);
      } else {
        console.log(`JSON saved to ${outputName}`);
      }
    });
  }
};

let writeSchemata = (err, schemata) => {
  if(err) {
    console.error(err);
    return;
  }

  for(let schemaName in schemata) {
    let schema = schemata[schemaName];
    writeSchema(schema);
  }
};

fundrayzDb.discoverSchemas('bid', { relations: true }, writeSchemata);
fundrayzDb.discoverSchemas('contact', { relations: true }, writeSchemata);
fundrayzDb.discoverSchemas('donation', { relations: true }, writeSchemata);
fundrayzDb.discoverSchemas('event', { relations: true }, writeSchemata);
fundrayzDb.discoverSchemas('item', { relations: true }, writeSchemata);
fundrayzDb.discoverSchemas('item_donation', { relations: true }, writeSchemata);
fundrayzDb.discoverSchemas('organization', { relations: true }, writeSchemata);
fundrayzDb.discoverSchemas('payment', { relations: true }, writeSchemata);
fundrayzDb.discoverSchemas('purchase', { relations: true }, writeSchemata);
fundrayzDb.discoverSchemas('role_permission', { relations: true }, writeSchemata);
fundrayzDb.discoverSchemas('supporter', { relations: true }, writeSchemata);
fundrayzDb.discoverSchemas('user_info', { relations: true }, writeSchemata);
fundrayzDb.discoverSchemas('user_role', { relations: true }, writeSchemata);
fundrayzDb.discoverSchemas('work_schedule', { relations: true }, writeSchemata);
