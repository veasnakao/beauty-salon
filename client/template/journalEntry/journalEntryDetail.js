Template.journalEntryDetail.created = function () {
    let params = Router.current().params;
    let date = params.date;
    let journalType = params.journalType;
    Meteor.call('journalEntryDetail', date, journalType, (error, result)=> {
        if (error) {
            sAlert.error(error.message);
        } else {
            Session.set('journalEntryDetail', result);
        }
    });
};

//helper
Template.journalEntryDetail.helpers({
    subTotalIsNotZero(subTotal){
        return subTotal != 0 && subTotal != null;
    },
    journalEntryDetail(){
        if (Session.get('journalEntryDetail')) {
            console.log(Session.get('journalEntryDetail'));
            return Session.get('journalEntryDetail');
        }
    }
});
