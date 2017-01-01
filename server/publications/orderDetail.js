//publish orderDetail
Meteor.publish('orderDetails', function () {
    return Collection.OrderDetail.find();
});
Meteor.publish('orderDetail', function (_id) {
    return Collection.OrderDetail.find({orderId: _id});
});
