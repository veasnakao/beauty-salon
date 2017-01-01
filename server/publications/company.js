//company
Meteor.publish('company', function () {
    let company = Collection.Company.find();
    if (company) {
        return company;
    }
});