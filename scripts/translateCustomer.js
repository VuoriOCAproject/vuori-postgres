var sys = require("sys"),
    fs = require("fs")

module.exports = function translateCustomer(callback) {
    fs.readFile('customers.csv', 'utf-8', (err, data) => {
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

            values.push(`(${innerValues.join(',')})`);
        });

        callback(null, values);
    });
}