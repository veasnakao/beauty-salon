
Meteor.methods({
    searchCustomer: function () {
        
        return Collection.Customer.find().fetch();

    }
});