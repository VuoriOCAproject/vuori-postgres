// To run lightspeed ETL process
const etlLightspeed = require('./lib/etl-lightspeed');
etlLightspeed
  .run()
  .then(() => {
    console.log('Lightspeed ETL process complete.');
  });

// To run test FTP process
const etlFtp = require('./lib/etl-ftp');
etlFtp
  .run()
  .then(() => {
    console.log('Test FTP process complete.');
  });
