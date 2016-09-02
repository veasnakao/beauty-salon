//publish staff
Meteor.publish('staffs', function () {
    return Collection.Staff.find();
});
Meteor.publish('staff', function (_id) {
    return Collection.Staff.find({_id: _id});
});

//publish customer
Meteor.publish('customers', function () {
    return Collection.Customer.find();
});
Meteor.publish('customer', function (_id) {
    return Collection.Customer.find({_id: _id});
});

//publish item
Meteor.publish('items', function () {
    return Collection.Item.find();
});
Meteor.publish('item', function (_id) {
    return Collection.Item.find({_id: _id});
});

//publish journalItem
Meteor.publish('journalItems', function () {
    return Collection.JournalItem.find();
});
Meteor.publish('journalItem', function (_id) {
    return Collection.JournalItem.find({_id: _id});
});

//publish journalEntry
Meteor.publish('journalEntrys', function () {
    return Collection.JournalEntry.find();
});
Meteor.publish('journalEntry', function (id) {
    // return Collection.DayExpense.find({_id: _id});
    return Collection.JournalEntry.find({_id: id});
});

//publish order
Meteor.publish('orders', function () {
    return Collection.Order.find();
});
Meteor.publish('order', function (selector) {
    return Collection.Order.find(selector);
});
// Meteor.publish('orderFindOne', function (status) {
//     return Collection.Order.find({status:status})
// });

//publish orderDetail
Meteor.publish('orderDetails', function () {
    return Collection.OrderDetail.find();
});
Meteor.publish('orderDetail', function (_id) {
    return Collection.OrderDetail.find({orderId: _id});
});

//publish payment
Meteor.publish('payments', function () {
    return Collection.Payment.find();
});
Meteor.publish('payment', function (orderId) {
    return Collection.Payment.find({orderId: orderId})
})

//item search
Meteor.publish('itemSearch', function (query, limit) {
    if (_.isEmpty(query)) {
        return this.ready();
    }
    let limitAmount = limit || 10;
    return Collection.Item.search(query, limitAmount);
});

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

//staff search
Meteor.publish('staffSearch', function (query, limit) {
    if (_.isEmpty(query)) {
        return this.ready();
    }
    let limitAmount = limit || 10;
    let staff = Collection.Staff.search(query, limitAmount);
    console.log(staff.fetch());
    return staff;
});

//user
Meteor.publish('allUser', function () {
    return Meteor.users.find();
});


