//oncreate
Template.editExpenseItem.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('expenseItem', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.editExpenseItem.rendered = function() {
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
Template.editExpenseItem.helpers({
    expenseItemInfo() {
        var template = Template.instance();
        return Collection.ExpenseItem.findOne({
            _id: template.data.id
        });
    }
});

//autoform hook
AutoForm.hooks({
    editExpenseItem: {
        onSuccess(formType, id){
            sAlert.success('Expense Item Edit Success');
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});