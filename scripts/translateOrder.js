var sys = require("sys"),
    fs = require("fs"),
    moment = require("moment")

module.exports = function translateOrder(callback) {
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

            var date = moment(new Date(innerValues[3])).format('LLL');
            console.log(date);
            innerValues[3] = `'${date}'`;
            values.push(`(${innerValues.join(',')})`);
        });

        callback(null, values);
    });
}