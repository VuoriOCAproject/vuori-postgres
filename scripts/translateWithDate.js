var sys = require("sys"),
    fs = require("fs"),
    moment = require("moment")

module.exports = function translateWithDate(callback) {
    fs.readFile('orders.csv', 'utf-8', (err, data) => {
        if (err) {
            callback(err, null);
        }

        const rows = data.split('\n');

        let values = [];

        rows.forEach(function(row) {
            const columns = row.split(',');

            let innerValues = [];

            columns.forEach(function(column) {
                innerValues.push(`'${column.replace('\'', '')}'`);
                
            });
            innerValues[3] = moment(innerValues[3]).format('LLL');

            values.push(`(${innerValues.join(',')})`);
        });

        callback(null, values);
    });
}