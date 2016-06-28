Tracker.autorun(function() {
    if (Session.get('searchQueryItem')) {
        Meteor.subscribe('itemsSearch', Session.get('searchQueryItem'), Session.get('limit'));
    }
});

//onRender
Template.searchItem.rendered = function () {
    Session.set('limit', 10);
};

//event
Template.searchItem.events({
    'keyup input': function (event, template) {
        Session.set('searchQueryItem', event.target.value);
    }
});

//helper
Template.searchItem.helpers({
    items: function () {
        return Collection.Item.search(Session.get('searchQueryItem'), Session.get('limit'));
    },
    searchQuery: function () {
        return Session.get('searchQueryItem');
    }

});

Template._productItem.helpers({

});

Template._productItem.events({
    'click': function() {
        let v = Session.set("searchQuery", this._id);
        console.log(v);
    }
});
