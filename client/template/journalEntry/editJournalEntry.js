//oncreate
Template.editJournalEntry.created = function () {
    this.autorun(function () {
        let journalEntryId = Router.current().params._id;
        this.subscription = Meteor.subscribe('journalEntry', journalEntryId);
        this.subscription = Meteor.subscribe('journalItems');
    }.bind(this));
};

//onrender
Template.editJournalEntry.rendered = function () {
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
Template.editJournalEntry.helpers({
    journalEntryDetail() {
        let journalEntryId = Router.current().params._id;
        let journalEntry = Collection.JournalEntry.findOne({
            _id: journalEntryId
        });
        if (journalEntry) {
            return journalEntry;
        }
    }
});

Template.editJournalEntry.events({
    'click .js-updateJournal'(){
        // let journalEntryId = Router.current().params._id;
        // return ReactiveMethod.call("journalEntryDetail",journalEntryId);
        // Meteor.call('journalEntryDetail', journalEntryId, (error, result)=> {
        //     if (error) {
        //         sAlert.error(error.message);
        //     } else {
        //         Session.set('journalEntryById', result);
        //     }
        // });
        // let data = Session.get('journalEntryById');
        // if (data) {
        //     console.log(data);
        // }
    }
});

//autoform hook
AutoForm.hooks({
    editJournalEntry: {
        onSuccess(formType, id){
            sAlert.success('Journal Entry Edit Success');
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});