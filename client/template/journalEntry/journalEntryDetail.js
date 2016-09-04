// Tracker.autorun(function () {
//     if (Session.get('journalEntryById')) {
//         Meteor.subscribe("journalEntrys");
//     }
// });
//oncreated
Template.journalEntryDetail.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('journalEntry', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.journalEntryDetail.rendered = function () {
    try {
        this.autorun(() => {
            if (!this.subscription.ready()) {
                IonLoading.show();
            } else {
                IonLoading.hide();
            }
        });
        // let journalEntryId = Router.current().params._id;
        // Meteor.call('journalEntryDetail', journalEntryId, (error, result)=> {
        //     if (error) {
        //         sAlert.error(error.message);
        //     } else {
        //         Session.set('journalEntryById', result);
        //     }
        // });
    } catch (e) {
        console.log(e);
    }
};

//helper
Template.journalEntryDetail.helpers({
    subTotalIsNotZero(subTotal){
        return subTotal != 0 && subTotal != null;
    },
    journalEntry(){
        let journalEntryId = Router.current().params._id;
        return ReactiveMethod.call("journalEntryDetail", journalEntryId);
        // let journalEntryById = Session.get('journalEntryById');
        // if (journalEntryById) {
        //     console.log(journalEntryById);
        //     return journalEntryById;
        // }
    }
});

Template.journalEntryDetail.events({
    'click .js-delete-journal'(){
        let params = Router.current().params;
        let journalEntryId = params._id;
        let journalEntry = Collection.JournalEntry.findOne({_id: journalEntryId});
        if(journalEntry){
            IonPopup.confirm({
                title: 'Are you sure to delete?',
                template: `Journal : ${journalEntry._id}?`,
                onOk: () => {
                    Meteor.call('removeJournalEntry', journalEntry._id, (err, result) => {
                        if (err) {
                            sAlert.error(`Cancel ${journalEntry.name}`);
                        } else {
                            Router.go(`/showJournalEntry`);
                            sAlert.success(`Journal delete success ${journalEntry._id}`);
                        }
                    });
                },
                onCancel: function () {
                }
            });
        }
    },
    'click .js-update-journal'(){
        let params = Router.current().params;
        let journalEntryId = params._id;
        Router.go(`/editJournalEntry/${journalEntryId}`);
    }
});