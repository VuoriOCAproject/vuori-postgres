const csv = require('csvtojson');

module.exports = {
    customers: customers,
    orders: orders,
    orderLineItems: orderLineItems,
    products: products
};

var JSFtp = require("jsftp");

///////////////

function convert(filename) {
    var ftp = new JSFtp({
        host: "etl.cwserve.com",
        port: 21,
        user: "vuori",
        pass: "vuori"
    });
    return new Promise((fulfill, reject) => {
        let remoteFilePath = `files/${filename}`;
        let localFilePath = __dirname + `/${filename}`;

        ftp.get(remoteFilePath, localFilePath, (err) => {
            if (err) return reject(err);

            let array = [];

            csv()
                .fromFile(localFilePath)
                .on('json', (data) => array.push(data))
                .on('done', (error) => {
                    if (error) {
                        return reject(error);
                    }

                    fulfill(array);
                });
        });
    });
}

function customers() {
    return convert('customers.csv');
}

function orders() {
    return convert('orders.csv');
}

function orderLineItems() {
    return convert('orderLineItems.csv');
}

function products() {
    return convert('products.csv');
}
