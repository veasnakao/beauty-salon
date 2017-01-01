//item search
Meteor.publish('itemSearch', function (query, limit) {
    if (_.isEmpty(query)) {
        return this.ready();
    }
    let limitAmount = limit || 10;
    return Collection.Item.search(query, limitAmount);
});