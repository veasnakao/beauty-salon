//publish staff
Meteor.publish('staffs', function() {
    return Collection.Staff.find();
});
Meteor.publish('staff', function(_id) {
    return Collection.Staff.find({_id: _id});
});

//publish customer
Meteor.publish('customers', function() {
    return Collection.Customer.find();
});
Meteor.publish('customer', function(_id) {
    return Collection.Customer.find({_id: _id});
});

//publish item
Meteor.publish('items', function() {
    return Collection.Item.find();
});
Meteor.publish('item', function(_id) {
    return Collection.Item.find({_id: _id});
});