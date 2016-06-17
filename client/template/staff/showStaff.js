//oncreated
Template.showStaff.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('staffs');
    }.bind(this));
};

//onrender
Template.showStaff.rendered = function() {
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

//helpers
    Template.showStaff.helpers({
        showStaff: ()=> {
            return Collection.Staff.find({},{sort: {_id:1}});
        }
    });