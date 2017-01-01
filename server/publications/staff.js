//publish staff
Meteor.publish('staffs', function () {
    return Collection.Staff.find();
});
Meteor.publish('staff', function (_id) {
    return Collection.Staff.find({_id: _id});
});
Meteor.publish('staffActive',function (selector) {
    return Collection.Staff.find(selector);
});