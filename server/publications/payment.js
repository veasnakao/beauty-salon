//publish payment
Meteor.publish('payments', function () {
    return Collection.Payment.find();
});
Meteor.publish('payment', function (orderId) {
    return Collection.Payment.find({orderId: orderId})
});