//oncreated
Template.company.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('company');
    }.bind(this));
};

//onrender
Template.company.rendered = function () {
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
Template.company.helpers({
    company() {
        let company = Collection.Company.find();
        if (company) {
            return company;
        }
    }
});