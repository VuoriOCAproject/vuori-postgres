const extract = require('./lib/extract');
const load = require('./lib/load');

Promise
    .all([
        extract.customers(),
        extract.orderLineItems(),
        extract.orders(),
        extract.products()
    ])
    .then(data => {
        return {
            customers: data[0],
            orderLineItems: data[1],
            orders: data[2],
            products: data[3]
        };
    })
    .then(data => {
        console.log('inserting customers into sql');
        return load
            .customers(data.customers)
            .then(() => {
                console.log('inserting products into sql');
                return load.products(data.products)
                    .then(() => {
                        console.log('inserting orders into sql');
                        return load.orders(data.orders)
                            .then(() => {
                                console.log('inserting order line items into sql');
                                return load.orderLineItems(data.orderLineItems);
                            });
                    });
            });
    })
    .then(() => {
        console.log('finished.');
    })
    .catch((err) => {
        console.log(err);
    });