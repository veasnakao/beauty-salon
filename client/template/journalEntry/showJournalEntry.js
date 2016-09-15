Tracker.autorun(function () {
    Meteor.call('showJournalEntry', Session.get('limitJournal'), (error, result)=> {
        if (error) {
            swal({
                title: "Error",
                text: error,
                type: "error",
                timer: 3000,
                showConfirmButton: true
            })
        } else {
            Session.set('showJournalEntry', result);
        }
    });
});
//oncreated
Template.showJournalEntry.created = function () {
    Session.set('limitJournal', 10);
};

Template.showJournalEntry.rendered = function () {
    Meteor.call('showJournalEntry', Session.get('limitJournal'), (error, result)=> {
        if (error) {
            swal({
                title: "Error",
                text: error,
                type: "error",
                timer: 3000,
                showConfirmButton: true
            })
        } else {
            Session.set('showJournalEntry', result);
        }
    });
}

//helper
Template.showJournalEntry.helpers({
    subTotalIsNotZero(subTotal){
        return subTotal != 0 && subTotal != null;
    },
    showJournalEntry(){
        if (Session.get('showJournalEntry')) {
            return Session.get('showJournalEntry');
        }
    },
    countJournalEntry(count){
        if (count >= 10) {
            return true;
        }
    }
});

Template.showJournalEntry.events({
    'click .js-load-more'(){
        let limit = Session.get('limitJournal') + 5;
        Session.set('limitJournal', limit);
    },
    'click .journalEntryById'(){
        let id = this.journalEntryId;
        // Router.go(`/journalEntryDetail/orderId/${orderId}?staffId=${order.staffId}&customerId=${order.customerId}`);
        Router.go(`/journalEntryDetailById/${id}`);

    },
    'click .add-journalEntry'(){
        Router.go('addJournalEntry');
    }
});

Template.showJournalEntry.onDestroyed(function () {

});
