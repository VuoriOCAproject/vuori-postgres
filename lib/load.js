const pg = require('pg')
const connection = "postgres://postgres:lawyer@localhost/testdb";
const moment = require('moment');

module.exports = {
    customers: customers,
    orders: orders,
    orderLineItems: orderLineItems,
    products: products
};

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

function customers(customers) {
    return load(customers, 'tests.customer');
}

function orders(orders) {
    return load(orders, 'tests.order');
}

function orderLineItems(orderLineItems) {
    return load(orderLineItems, 'tests.orderlineitem');
}

function products(products) {
    return load(products, 'tests.product');
}
