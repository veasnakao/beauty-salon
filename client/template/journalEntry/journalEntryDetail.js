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
        return ReactiveMethod.call("journalEntryDetail",journalEntryId);
        // let journalEntryById = Session.get('journalEntryById');
        // if (journalEntryById) {
        //     console.log(journalEntryById);
        //     return journalEntryById;
        // }
    }
});