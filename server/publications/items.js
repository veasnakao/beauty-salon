//publish item
Meteor.publish('items', function () {
    return Collection.Item.find();
});
Meteor.publish('item', function (_id) {
    return Collection.Item.find({_id: _id});
});