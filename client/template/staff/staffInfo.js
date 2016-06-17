//oncreate
Template.staffInfo.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('staff', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.staffInfo.rendered = function() {
    try {
        this.autorun(() => {
            if (!this.subscription.ready()) {
                IonLoading.show();
            } else {
                IonLoading.hide();
            }
        })
    } catch (e) {
        console.log(e);
    }
};

//helper
Template.staffInfo.helpers({
    staffInfo: function () {
        return Collection.Staff.findOne({_id: Router.current().params._id});
    }
});
