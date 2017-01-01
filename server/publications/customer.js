//publish customer
Meteor.publish('customers', function () {
    return Collection.Customer.find();
});
Meteor.publish('customer', function (_id) {
    return Collection.Customer.find({_id: _id});
});