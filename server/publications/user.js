//user
Meteor.publish('allUser', function () {
    return Meteor.users.find();
});