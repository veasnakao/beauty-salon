//oncreated
Template.addJournalEntry.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('journalEntrys');
        this.subscription = Meteor.subscribe('journalItems');
    }.bind(this));
};

//onrender
Template.addJournalEntry.rendered = function () {
    try {
        this.autorun(() => {
            if (!this.subscription.ready()) {
                IonLoading.show();
            } else {
                IonLoading.hide();
            }
        });
    } catch (e) {
        console.log(e);
    }
};

AutoForm.hooks({
    addJournalEntry: {
        before: {
            insert: function (doc) {
                let date = doc.date;
                console.log(date);
                date = moment(date).format('YYYYMMDD');
                let prefix = date + '-';
                doc._id = idGenerator.genWithPrefix(Collection.JournalEntry, '001-', 7);
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

Template.addJournalEntry.events({
    'click .js-back'(){
        Router.go('showJournalEntry');
    }
});
