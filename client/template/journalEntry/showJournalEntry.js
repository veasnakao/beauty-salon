//oncreated
Template.showJournalEntry.created = function () {
    Meteor.call('showJournalEntry', (error, result)=> {
        if (error) {
            sAlert.error(error.message);
        } else {
            Session.set('showJournalEntry', result);
        }
    });
};

//helper
Template.showJournalEntry.helpers({
    subTotalIsNotZero(subTotal){
        return subTotal != 0 && subTotal != null;
    },
    showJournalEntry(){
        if (Session.get('showJournalEntry')) {
            console.log(Session.get('showJournalEntry'));
            return Session.get('showJournalEntry');
        }
    }
});

Template.showJournalEntry.events({
    'click .journalEntryById'(){
        let id = this.journalEntryId;
        console.log(this);
        // Router.go(`/journalEntryDetail/orderId/${orderId}?staffId=${order.staffId}&customerId=${order.customerId}`);
        Router.go(`/journalEntryDetailById/${id}`);

    },
    'click .add-journalEntry'(){
        Router.go('addJournalEntry');
    },
    'click .edit-journalEntry'(){
        console.log(this);
    }
});

Template.showJournalEntry.onDestroyed(function () {

});
