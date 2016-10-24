Tracker.autorun(function () {
    if (Session.get('searchQueryStaff')) {
        Meteor.subscribe('staffSearch', Session.get('searchQueryStaff'));
    }
});


//onRender
Template.searchStaff.rendered = function () {
    Session.set('limit', 10);
};

//event
Template.searchStaff.events({
    'keyup .js-search-staff': function (event, template) {
        Session.set('searchQueryStaff', event.target.value);
    },
    'click .close-modal': ()=> {
        Session.set('searchQueryStaff', undefined);
    }
});

//helper
Template.searchStaff.helpers({
    staffs: function () {
        let staffs = Collection.Staff.search(Session.get('searchQueryStaff'), Session.get('limit'));
        if (staffs) {
            return staffs;
        }
    },
    searchQueryStaff: function () {
        return Session.get('searchQueryStaff');
    }
});

//onDestroyed
Template.searchStaff.onDestroyed(function () {
    // Session.set('searchQueryStaff', undefined);
});


//helper
Template._showStaffs.helpers({
    staffId: function () {
        return Session.get('staffId');
    }
});

//template _staffs events
Template._showStaffs.events({
    'click .insert-staff': function () {
        let staffId = this._id;
        if (staffId) {
            Session.set('staffId', staffId);
        }
    }
});




