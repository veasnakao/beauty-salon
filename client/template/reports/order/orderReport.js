Tracker.autorun(function () {

    if (Session.get('staffId')) {
        Meteor.subscribe("staff", Session.get('staffId'));
    }
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
        Meteor.subscribe("order", selector);
    }
});


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

        // if (Session.get('fromDate') && Session.get('toDate')) {
        if (Session.get('orderAllStaffResult')) {
            return Session.get('orderAllStaffResult');
        }
        else if (Session.get('orderByStaffResult')) {
            return Session.get('orderByStaffResult');
        }
        // let fromDate = Session.get('fromDate');
        // let toDate = Session.get('toDate');
        // let getStaffId = Session.get('getStaffId');
        // let getAllStaffId = Session.get('getAllStaffId');
        //
        // if (getStaffId) {
        //     let staffId = Session.get('getStaffId');
        //     Meteor.call('orderByStaff', fromDate, toDate, staffId, function (error, result) {
        //         if (error) {
        //             sAlert.error(error.message);
        //         } else {
        //             Session.set('orderByStaffResult', result);
        //         }
        //     });
        //     if (Session.get('orderByStaffResult')) {
        //         return Session.get('orderByStaffResult');
        //     } else {
        //         return false;
        //     }
        // } else if (getAllStaffId) {
        //     Meteor.call('orderAllStaff', fromDate, toDate, function (error, result) {
        //         if (error) {
        //             sAlert.error(error.message);
        //         } else {
        //             Session.set('orderAllStaffResult', result);
        //         }
        //     });
        //     if (Session.get('orderAllStaffResult')) {
        //         console.log(Session.get('orderAllStaffResult'));
        //         return Session.get('orderAllStaffResult');
        //     }
        // } else {
        //     return false;
        // }
        // } else {
        //     return false;
        // }
    }
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
            $('.js-by-staff').prop('checked', false);
            $('.show-staff').hide(500);
            Session.set('allStaffId', {});
            Session.set('staffId', undefined);
        }
    },
    'click .js-by-staff'(e){
        if ($(e.currentTarget).prop('checked')) {
            $('.js-all-staff').prop('checked', false);
            $('.show-staff').show(500);
            Session.set('allStaffId', undefined);
        } else {
            $('.show-staff').hide(500);
        }
    },
    'click .js-submit-report'(){

        let getFromDate = $('.js-from-date').val();
        let getToDate = $('.js-to-date').val();
        if (getFromDate && getToDate) {
            Session.set('fromDate', getFromDate);
            Session.set('toDate', getToDate);
            if (Session.get('allStaffId')) {
                Meteor.call('orderAllStaff', getFromDate, getToDate, function (error, result) {
                    if (error) {
                        sAlert.error(error.message);
                    } else {
                        Session.set('orderAllStaffResult', result);
                    }
                });
            } else if (Session.get('staffId')) {
                let staffId = Session.get('staffId');
                Meteor.call('orderByStaff', getFromDate, getToDate, staffId, function (error, result) {
                    if (error) {
                        sAlert.error(error.message);
                    } else {
                        Session.set('orderByStaffResult', result);
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