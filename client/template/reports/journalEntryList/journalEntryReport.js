Template.journalEntryReport.helpers({
    journalType(){
        if (Session.get('journalType')) {
            return Session.get('journalType');
        }
    },
    journalDate(){
        let fromDate = Session.get('fromDate');
        let toDate = Session.get('toDate');
        let data = {};
        data = {
            fromDate: fromDate,
            toDate: toDate
        };
        return data;
    },
    checkIsNotEmpty(total){
        return total != 0 && total != null;
    },
    journalEntryReport(){
        if (Session.get('journalEntry')) {
            return Session.get('journalEntry');
        }
    },
    company(){
        let company = Collection.Company.find();
        if(company) {
            return company;
        }
    }
});


Template.journalEntryReport.events({
    'click #print'(){
        var mode = 'iframe'; // popup
        var close = mode == "popup";
        var options = {mode: mode, popClose: close};
        $("div.print").printArea(options);
    },
    'click .js-expense'(e){
        if ($(e.currentTarget).prop('checked')) {
            $('.js-income').prop('checked', false);
        }
    },
    'click .js-income'(e){
        if ($(e.currentTarget).prop('checked')) {
            $('.js-expense').prop('checked', false);
        }
    },
    'click .js-journalEntry-report'(e, instance){
        let fromDate = instance.$('.js-from-date').val();
        let toDate = instance.$('.js-to-date').val();
        Session.set('fromDate', fromDate);
        Session.set('toDate', toDate);
        if ($('.js-expense').is(':checked')) {
            let journalType = 'expense';
            Session.set('journalType', journalType);
            Meteor.call('journalEntryReport', fromDate, toDate, journalType, (error, result)=> {
                if (error) {
                    sAlert.error(error.message)
                } else {
                    Session.set('journalEntry', result);
                }
            });
        } else if ($('.js-income').is(':checked')) {
            let journalType = 'income';
            Session.set('journalType', journalType);
            Meteor.call('journalEntryReport', fromDate, toDate, journalType, (error, result)=> {
                if (error) {
                    sAlert.error(error.message);
                } else {
                    Session.set('journalEntry', result);
                }
            });
        }
    }
});
Template.journalEntryReport.onDestroyed(function () {
    Session.set('journalEntry', undefined);
    
});