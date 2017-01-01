//customer search
Meteor.publish('customerSearch', function (query, limit) {
    if (_.isEmpty(query)) {
        return this.ready();
    }
    let limitAmount = limit || 10;
    let customer = Collection.Customer.search(query, limitAmount);
    console.log(customer.fetch());
    return customer;
});