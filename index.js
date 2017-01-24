const pg = require('pg')
const translateCustomer = require('./scripts/translateCustomer.js')
const translateOrder = require('./scripts/translateOrder.js')
const translateOrderLineItem = require('./scripts/translateOrderLineItem.js')
const translateProduct = require('./scripts/translateProduct.js')

// db connection string
const connection = "postgres://postgres:lawyer@localhost/testdb";

// import product table
translateProduct(function(err, values) {
    pg.connect(connection, function(err, client, done) {
        if (err) {
            return console.error('error', err)
        }

        const query = 'insert into tests.product (productId, name, color, price, productAdjective, productMaterial)' 
        + ' values ' + values.join(',') + ';';

        console.log(query);

        client.query(query, function(err, result) {
            if (err) {
                return console.error('problem running query', err);
            }

        done();
    })
});
});

//import customer table

translateCustomer(function(err, values) {
    pg.connect(connection, function(err, client, done) {
        if (err) {
            return console.error('error', err)
        }

        const query = 'insert into tests.customer (customerId, title, prefix, firstName, lastName, suffix, phone, email)' 
        + ' values ' + values.join(',') + ';';

        console.log(query);

        client.query(query, function(err, result) {
            if (err) {
                return console.error('problem running query', err);
            }
            // import order table
            translateOrder(function(err, values) {
                pg.connect(connection, function(err, client, done) {
                    if (err) {
                        return console.error('error', err)
                    }

                    const query = 'insert into tests.order (orderId,customerId,amount,date)' + ' values ' + values.join(',') + ';';


                    client.query(query, function(err, result) {
                        if (err) {
                            return console.error('problem running query', err);
                        }

                        // import orderlineitem table
                        translateOrderLineItem(function(err, values) {
                            pg.connect(connection, function(err, client, done) {
                                if (err) {
                                    return console.error('error', err)
                                }

                                const query = 'insert into tests.orderlineitem (orderId, productId, quantity)' 
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

            done();
        })
    })
});
        })
    })
});