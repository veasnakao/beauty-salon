//oncreated
Template.setRole.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('allUser');
    }.bind(this));
};

//onrender
Template.setRole.rendered = function() {
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
Template.setRole.helpers({
    showUser:()=>{
        return Meteor.users.find();
    }
});