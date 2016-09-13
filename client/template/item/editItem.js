//oncreate
Template.editItem.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('item', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.editItem.rendered = function() {
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
Template.editItem.helpers({
    itemInfo() {
        var template = Template.instance();
        return Collection.Item.findOne({
            _id: template.data.id
        });
    }
});

//autoform hook
AutoForm.hooks({
    editItem: {
        onSuccess(formType, id){
            sAlert.success('Staff Edit Success');
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});