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
    staffOrderReport: function () {
        if (Session.get('fromDate') && Session.get('toDate')) {
            let fromDate = Session.get('fromDate');
            let toDate = Session.get('toDate');
            let getStaffId = Session.get('getStaffId');
            let getAllStaffId = Session.get('getAllStaffId');
            if (getStaffId) {
                let staffId = Session.get('getStaffId');
                Meteor.call('orderByStaff', fromDate, toDate, staffId, function (error, result) {
                    if (error) {
                        sAlert.error(error.message);
                    } else {
                        Session.set('orderByStaffResult', result);
                    }
                });
                let data=Session.get('orderByStaffResult');
                if(data.content.length>0){
                    return data;
                }else{
                    return false;
                }
            } else if (getAllStaffId) {
                Meteor.call('orderAllStaff', fromDate, toDate, function (error, result) {
                    if (error) {
                        sAlert.error(error.message);
                    } else {
                        Session.set('orderAllStaffResult', result);
                    }
                });
                console.log(Session.get('orderAllStaffResult'));
                return Session.get('orderAllStaffResult');
            } else {
                return false;
            }
        }
    }
});

Template.orderReport.events({
    'click .js-all-staff'(e){
        if ($(e.currentTarget).prop('checked')) {
            $('.js-by-staff').prop('checked', false);
            $('.show-staff').hide(500);
            $('.js-submit-report').show(500);
            Session.set('allStaffId', {});
            Session.set('staffId', undefined);
            Session.set('getStaffId', undefined);
        } else {
            $('.js-submit-report').hide(500);
            Session.set('allStaffId', undefined);
            Session.set('getAllStaffId', undefined);
        }
    },
    'click .js-by-staff'(e){
        if ($(e.currentTarget).prop('checked')) {
            $('.js-all-staff').prop('checked', false);
            $('.show-staff').show(500);
            $('.js-submit-report').show(500);
            Session.get('staffId');
            Session.set('allStaffId', undefined);
            Session.set('getAllStaffId', undefined);
        } else {
            $('.show-staff').hide(500);
            $('.js-submit-report').hide(500);
            Session.set('staffId', undefined);
            Session.set('getStaffId', undefined);
        }
    },
    'click .js-submit-report'(){
        let getFromDate = $('.js-from-date').val();
        let getToDate = $('.js-to-date').val();
        if (getFromDate && getToDate) {
            if (Session.get('allStaffId') || Session.get('staffId')) {
                Session.set('getAllStaffId', Session.get('allStaffId'));
                Session.set('getStaffId', Session.get('staffId'));
                Session.set('fromDate', getFromDate);
                Session.set('toDate', getToDate);
            }
        }
    }
});

//onDestroyed
Template.orderReport.onDestroyed(function () {
    Session.set('staffId', undefined);
    Session.set('allStaffId', undefined);
    Session.set('getAllStaffId', undefined);
    Session.set('getStaffId', undefined);
    Session.set('fromDate', undefined);
    Session.set('toDate', undefined);
});