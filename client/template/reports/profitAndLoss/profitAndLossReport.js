Template.profitAndLossReport.helpers({
    profitAndLossDate(){
        if (Session.get('fromDate') && Session.get('toDate')) {
            let data = {};
            let fromDate = Session.get('fromDate');
            let toDate = Session.get('toDate');
            data = {
                fromDate: fromDate,
                toDate: toDate
            };
            return data;
        }
    },
    checkIsNotEmpty(total){
        return total != 0 && total != null;
    },
    profitAndLoss(){
        if(Session.get('profitAndLoss')){
            return Session.get('profitAndLoss');
        }
    },
    company(){
        let company = Collection.Company.find();
        if(company) {
            return company;
        }
    }
});

Template.profitAndLossReport.events({
    'click #print'(){
        var mode = 'iframe'; // popup
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
            Meteor.call('profitAndLoss', fromDate, toDate, (error, result)=> {
                if(error) {
                    sAlert.error(error.message);
                }else{
                    Session.set('profitAndLoss', result);
                }
            });
        }
    }
});

Template.profitAndLossReport.onDestroyed(function () {
    Session.set('profitAndLoss', undefined);
    Session.set('fromDate', undefined);
    Session.set('toDate', undefined);
});