
Template.orderReport.helpers({
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
    staffOrderReport: function () {
        if (Session.get('orderByStaffResult')) {
            return Session.get('orderByStaffResult');
        } else {
            return Session.get('orderAllStaffResult');
        }
    },
    checkIsNotEmpty(total){
        return total != 0 && total != null;
    },
});

Template.orderReport.events({
    'click #print'(){
        var mode = 'iframe'; // popup
        var close = mode == "popup";
        var options = {mode: mode, popClose: close};
        $("div.print").printArea(options);
    },
    'click .js-all-staff'(e){
        if ($(e.currentTarget).prop('checked')) {
            Session.set('staffId', undefined);
            $('.js-by-staff').prop('checked', false);
            // $('.show-staff').hide(500);
        }
    },
    'click .js-by-staff'(e){
        if ($(e.currentTarget).prop('checked')) {
            $('.js-all-staff').prop('checked', false);
            $('.show-staff').show(500);
        } else {
            // $('.show-staff').hide(500);
        }
    },
    'click .js-submit-report'(){
        let getFromDate = $('.js-from-date').val();
        let getToDate = $('.js-to-date').val();
        if (getFromDate && getToDate) {
            Session.set('fromDate', getFromDate);
            Session.set('toDate', getToDate);
            if (Session.get('staffId')) {
                let staffId = Session.get('staffId');
                console.log(staffId);
                Meteor.call('orderByStaff', getFromDate, getToDate, staffId, function (error, result) {
                    if (error) {
                        sAlert.error(error.message);
                    } else {
                        Session.set('orderAllStaffResult', undefined);
                        Session.set('orderByStaffResult', result);
                    }
                });
            } else {
                Meteor.call('orderAllStaff', getFromDate, getToDate, function (error, result) {
                    if (error) {
                        sAlert.error(error.message);
                    } else {
                        Session.set('orderByStaffResult', undefined);
                        Session.set('orderAllStaffResult', result);
                    }
                });
            }
        }
    }
});

//onDestroyed
Template.orderReport.onDestroyed(function () {
    Session.set('orderAllStaffResult', undefined);
    Session.set('staffId', undefined);
    Session.set('allStaffId', undefined);
    Session.set('getAllStaffId', undefined);
    Session.set('getStaffId', undefined);
    Session.set('fromDate', undefined);
    Session.set('toDate', undefined);
});