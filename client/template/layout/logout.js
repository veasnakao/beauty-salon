Template.layout.events({
    "click .js-logout": function(event, template) {
        event.preventDefault();
        Meteor.logout(function(error) {
            if (error) {
                sAlert.error(error.message);
            } else {
                Router.go(`/login`);
            }
        });
    }
});