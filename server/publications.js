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

//publish expenseItem
Meteor.publish('expenseItems', function() {
    return Collection.ExpenseItem.find();
});
Meteor.publish('expenseItem', function(_id) {
    return Collection.ExpenseItem.find({_id: _id});
});

//publish dayExpense
Meteor.publish('dayExpenses', function() {
    return Collection.DayExpense.find();
});
Meteor.publish('dayExpense', function(_id) {
    return Collection.DayExpense.find({_id: _id});
});

//publish order
Meteor.publish('orders', function() {
    return Collection.Order.find();
});
Meteor.publish('order', function(selector) {
    return Collection.Order.find(selector);
});
// Meteor.publish('orderFindOne', function (status) {
//     return Collection.Order.find({status:status})
// });

//publish orderDetail
Meteor.publish('orderDetails', function() {
    return Collection.OrderDetail.find();
});
Meteor.publish('orderDetail', function(_id) {
    return Collection.OrderDetail.find({orderId: _id});
});

//item search
Meteor.publish('itemSearch', function(query, limit) {
    if (_.isEmpty(query)) {
        return this.ready();
    }
    let limitAmount = limit || 10;
    return Collection.Item.search(query, limitAmount);
});

//customer search
Meteor.publish('customerSearch', function(query, limit) {
    if (_.isEmpty(query)) {
        return this.ready();
    }
    let limitAmount = limit || 10;
    return Collection.Customer.search(query, limitAmount);
    // return customer;
});


