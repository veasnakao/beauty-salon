//oncreate
Template.expenseItemInfo.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('expenseItem', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.expenseItemInfo.rendered = function() {
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
Template.expenseItemInfo.helpers({
    expenseItemInfo: function () {
        return Collection.ExpenseItem.findOne({_id: Router.current().params._id});
    }
});