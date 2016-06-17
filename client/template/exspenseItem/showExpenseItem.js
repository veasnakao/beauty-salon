//oncreated
Template.showExpenseItem.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('expenseItems');
    }.bind(this));
};

//onrender
Template.showExpenseItem.rendered = function() {
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
Template.showExpenseItem.helpers({
    showExpenseItem:()=>{
        return Collection.ExpenseItem.find({},{sort: {_id:1}});
    }
});