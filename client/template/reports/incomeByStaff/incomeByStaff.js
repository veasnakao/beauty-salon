Template.incomeByStaffReport.helpers({
    incomeByStaff(){
        if (Session.get('incomeByStaff')) {
            let incomeByStaff = Session.get('incomeByStaff');
            return incomeByStaff;
        }
    },
    date(){
        let date = {};
        let fromDate = Session.get('fromDate');
        let toDate = Session.get('toDate');
        date = {
            fromDate: fromDate,
            toDate: toDate
        };
        return date;
    },
    company(){
        let company = Collection.Company.find();
        if (company) {
            return company;
        }
    },
});

Template.incomeByStaffReport.events({
    'click #print'(){
        var mode = 'iframe';
        var close = mode == "popup";
        var options = {mode: mode, popClose: close};
        $("div.print").printArea(options);
    },
    'click .js-submit-report'(){
        let fromDate = $('.js-from-date').val();
        let toDate = $('.js-to-date').val();
        if (fromDate && toDate) {
            Session.set('fromDate', fromDate);
            Session.set('toDate', toDate);
            Meteor.call('incomeByStaff', fromDate, toDate, (error, result)=> {
                if (error) {
                    sAlert.error(error.message);
                } else {
                    Session.set('incomeByStaff', result);
                }
            });
        }
    }
});

//onDestroyed
Template.incomeByStaffReport.onDestroyed(function () {
    Session.set('incomeByStaff', undefined);
    Session.set('fromDate', undefined);
    Session.set('toDate', undefined);
});