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