const pg = require('pg')
const moment = require('moment');

let connection = '';
module.export = function init(connectionString) {
  connection = connectionString;

  return load;
}

//////////////////

function load(data, tableName) {
    return new Promise((fulfill, reject) => {
        pg.connect(connection, (err, client, done) => {
            if (err) {
                return reject(err);
            }

            let columnNames = Object.keys(data[0]);

            let sqlQuery = `INSERT INTO ${tableName} (${columnNames.join(',')}) values `;

            let outerValues = [];

            data.forEach((obj) => {
                let values = [];

                columnNames.forEach((column) => {
                    switch (typeof obj[column]) {
                        case 'string':
                            if (new Date(obj[column]) != 'Invalid Date') {
                                values.push(`'${moment(new Date(obj[column])).format('LLL')}'`);
                                break;
                            } else {
                                values.push(`'${obj[column].replace("'", '')}'`);
                                break;
                            }
                        case 'number':
                            values.push(obj[column]);
                            break;
                    }


                });

                outerValues.push(`(${values.join(',')})`);
            });

            sqlQuery += outerValues.join(',');

            client.query(sqlQuery, (err, result) => {
                if (err) {
                    return reject(err);
                }

                fulfill();
                done();
            })
        });
    });
}
