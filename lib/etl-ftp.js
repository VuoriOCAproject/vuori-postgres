const extract = require('./extract');
const load = require('./load')("postgres://postgres:lawyer@localhost/testdb");

module.exports = {
  run: function() {
    return Promise
        .all([
            extract('customers.csv'),
            extract('orderlineitems.csv'),
            extract('orders.csv'),
            extract('products.csv')
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

            return load(data.customers, 'tests.customer')
              .then(() => {
                return load(data.products, 'tests.product');
              })
              .then(() => {
                return load(data.orders, 'tests.order');
              })
              .then(() => {
                return load(data.orderLineItems, 'tests.orderlineitem');
              });
        })
        .then(() => {
            console.log('finished.');
        })
        .catch((err) => {
            console.log(err);
        });

  }
}
