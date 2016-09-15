Template.orderDetailReport.helpers({
    staffName: function () {
        let staff = Collection.Staff.findOne(Session.get('staffId'));
        if (staff) {
            return staff.name;
        }
    },
    serviceDate(){
        let serviceDate = {};
        let fromDate = Session.get('fromDate');
        let toDate = Session.get('toDate');
        serviceDate = {
            fromDate: fromDate,
            toDate: toDate
        };
        return serviceDate;
    },
    orderDetailReport: function () {
        if (Session.get('orderDetailReport')) {
            return Session.get('orderDetailReport');
        }
    },
    checkIsNotEmpty(total){
        return total != 0 && total != null;
    },
    checkDiscountType(type){
        if (type == 'c') {
            return true;
        }
    },
    company(){
        let company = Collection.Company.find();
        if(company) {
            return company;
        }
    }
});

Template.orderDetailReport.events({
    'click #print'(){
        var mode = 'iframe'; // popup
        var close = mode == "popup";
        var options = {mode: mode, popClose: close};
        $("div.print").printArea(options);
    },
    'click .js-submit-report'(){
        let getFromDate = $('.js-from-date').val();
        let getToDate = $('.js-to-date').val();
        if (getFromDate && getToDate) {
            Session.set('fromDate', getFromDate);
            Session.set('toDate', getToDate);
            Meteor.call('orderDetailReport', getFromDate, getToDate, function (error, result) {
                if (error) {
                    sAlert.error(error.message);
                } else {
                    Session.set('orderDetailReport', result);
                }
            });
        }
    }
});

//onDestroyed
Template.orderDetailReport.onDestroyed(function () {
    Session.set('orderDetailReport', undefined);
    Session.set('orderAllStaffResult', undefined);
    Session.set('staffId', undefined);
    Session.set('allStaffId', undefined);
    Session.set('getAllStaffId', undefined);
    Session.set('getStaffId', undefined);
    Session.set('fromDate', undefined);
    Session.set('toDate', undefined);
});