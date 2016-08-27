//oncreated
Template.addJournalEntry.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('journalEntrys');
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
    addJournalEntry: {//id autoform
        before: {
            insert: function (doc) {
                let todayDate = moment().format('YYYYMMDD');
                let prefix = todayDate + '-';
                doc._id = idGenerator.genWithPrefix(Collection.JournalEntry, prefix, 4);
                return doc;
            }
        },
        onSuccess(formType, id){
            sAlert.success('Add Journal Entry Success');
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});
