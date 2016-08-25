//oncreate
Template.editJournalItem.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('journalItem', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.editJournalItem.rendered = function() {
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
Template.editJournalItem.helpers({
    journalItemInfo() {
        var template = Template.instance();
        return Collection.JournalItem.findOne({
            _id: template.data.id
        });
    }
});

//autoform hook
AutoForm.hooks({
    editJournalItem: {
        onSuccess(formType, id){
            sAlert.success('Journal Item Edit Success');
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});