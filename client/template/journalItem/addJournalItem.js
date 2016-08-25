//oncreated
Template.addJournalEntry.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('journalItems');
    }.bind(this));
};

//onrender
Template.addJournalEntry.rendered = function() {
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
AutoForm.hooks({
    addJournalItem: {//id autoform
        before: {
            insert: function (doc) {
                doc._id = idGenerator.genWithPrefix(Collection.JournalItem, '001-', 7);
                return doc;
            }
        },
        onSuccess(formType, id){
            sAlert.success('Add Journal Item Success');
        },
        onError(formType, error){
            console.log(error);
            sAlert.error(error.message);
        }
    }
});