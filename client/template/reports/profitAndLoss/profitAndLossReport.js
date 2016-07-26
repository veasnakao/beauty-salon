Tracker.autorun(function () {
    if (Session.get('fromDate') && Session.get('toDate')) {
        let fromDate = Session.get('fromDate');
        let toDate = Session.get('toDate');
        fromDate = moment(fromDate).toDate();
        toDate = moment(toDate).toDate();
        let selector = {
            date: {
                $gte: fromDate,
                $lte: toDate
            }
        };
        Meteor.subscribe("dayExpense", selector);
    }
});

//oncreated
Template.profitAndLossReport.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('dayExpenses');
    }.bind(this));
};

Template.profitAndLossReport.helpers({
    dayExpenseItems() {
        let fromDate = Session.get('fromDate');
        let toDate = Session.get('toDate');
        if (fromDate && toDate) {
            var myMethods = [{ name : 'expense'}, { name : 'income'}];
            myMethods.map(function(data){
               Meteor.call(data.name,function (error,result) {
                   
               }) 
            });
            Meteor.call('expense', fromDate, toDate, function (error, result) {
                if (error) {
                    sAlert.error(error.message);
                } else {
                    Session.set('dayExpenseItemsResult', result);
                }
            });
            let dataDayExpenseItemsResult = Session.get('dayExpenseItemsResult');
            if (dataDayExpenseItemsResult.content.length>0) {
                console.log(Session.get('dayExpenseItemsResult'));
                return dataDayExpenseItemsResult;
            } else {
                return false;
            }
        }else{
            return false;
        }
    }
});

Template.profitAndLossReport.events({
    'click .js-submit-report'(){
        let fromDate = $('.js-from-date').val();
        let toDate = $('.js-to-date').val();
        if (fromDate && toDate) {
            Session.set('fromDate', fromDate);
            Session.set('toDate', toDate);
        }
    }
});

Template.profitAndLossReport.onDestroyed(function () {
    Session.set('dayExpenseItemsResult', undefined);
    Session.set('fromDate', undefined);
    Session.set('toDate', undefined);
});