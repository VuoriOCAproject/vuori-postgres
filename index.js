const pg = require('pg')
const translate = require('./scripts/translate.js')
const translateWithDate = require('./scripts/translateWithDate.js')

// db connection string
const connection = "postgres://postgres:lawyer@localhost/testdb";

translate(function(err, values) {
    pg.connect(connection, function(err, client, done) {
        if (err) {
            return console.error('error', err)
        }

        // solve how to insert a script into table
        const query = 'insert into tests.customer (customerId, title, prefix, firstName, lastName, suffix, phone, email)' 
        + ' values ' + values.join(',') + ';';

        console.log(query);

        client.query(query, function(err, result) {
            if (err) {
                return console.error('problem running query', err);
            }
            done();
        })
    })

});

translateWithDate(function(err, values) {
    pg.connect(connection, function(err, client, done) {
        if (err) {
            return console.error('error', err)
        }

        // solve how to insert a script into table
        const query = 'insert into tests.order (orderId,customerId,amount,date)' + ' values ' + values.join(',') + ';';

        console.log(query);

        client.query(query, function(err, result) {
            if (err) {
                return console.error('problem running query', err);
            }
            done();
        })
    })

});