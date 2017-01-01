//publish order
Meteor.publish('orders', function () {
    return Collection.Order.find();
});
Meteor.publish('order', function (selector) {
    return Collection.Order.find(selector);
});