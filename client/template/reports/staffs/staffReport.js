Tracker.autorun(function () {
    if (Session.get('staffBaseSalary')) {
        Meteor.subscribe("staffs");
    }
    if (Session.get('staffFee')) {
        Meteor.subscribe("staffs");
    }
});

//oncreated
Template.staffReport.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('staffs');
    }.bind(this));
};

//onrender
Template.staffReport.rendered = function () {
    try {
        this.autorun(() => {
            if (!this.subscription.ready()) {
                IonLoading.show();
            } else {
                IonLoading.hide();
            }
        })
    } catch (e) {
        console.log(e);
    }
};

Template.staffReport.helpers({
    staffBaseSalary: function () {
        let staffBaseSalary = Collection.Staff.find({
            baseSalary: {
                $gte: Session.get('staffBaseSalary')
            }
        });
        if (staffBaseSalary) {
            return staffBaseSalary;
        }
    },
    countStaffBaseSalary: function () {
        let staffBaseSalary = Collection.Staff.find({
            baseSalary: {
                $gte: Session.get('staffBaseSalary')
            }
        }).count();

        if (staffBaseSalary) {
            return staffBaseSalary;
        }
    },
    staffFee: function () {
        let staffFee = Collection.Staff.find({
            fee: {
                $gte: Session.get('staffFee')
            }
        });
        if (staffFee) {
            return staffFee;
        }
    },
    countStaffFee: function () {
        let staffFee = Collection.Staff.find({
            fee: {
                $gte: Session.get('staffFee')
            }
        }).count();
        if (staffFee) {
            return staffFee;
        }
    }
});

Template.staffReport.events({
    'click .js-staff-fee'(e){
        if ($(e.currentTarget).prop('checked')) {
            $('.js-staff-base-salary').prop('checked', false);
            $('.js-submit-report').show(500);
            $('.list-staffBaseSalary').hide(500);
            Session.set('staffBaseSalary', undefined);
        } else {
            $('.js-submit-report').hide(500);
            $('.list-staffFee').hide(500);
            Session.set('staffBaseSalary', undefined);
            Session.set('staffFee', undefined);
        }
    },
    'click .js-staff-base-salary'(e){
        if ($(e.currentTarget).prop('checked')) {
            $('.js-staff-fee').prop('checked', false);
            $('.js-submit-report').show(500);
            $('.list-staffFee').hide(500);
            Session.set('staffFee', undefined);
        } else {
            $('.js-submit-report').hide(500);
            $('.list-staffBaseSalary').hide(500);
            Session.set('staffBaseSalary', undefined);
            Session.set('staffFee', undefined);
        }
    },
    'click .js-submit-report'(e){
        if ($('.js-staff-fee').is(':checked')) {
            Session.set('staffFee', 1);
            $('.list-staffFee').show(500);
            $('.list-staffBaseSalary').hide(500);
        }
        else if ($('.js-staff-base-salary').is(':checked')) {
            Session.set('staffBaseSalary', 1);
            $('.list-staffBaseSalary').show(500);
            $('.list-staffFee').hide(500);
        }
    }
});

//onDestroyed
Template.staffReport.onDestroyed(function () {
    Session.set('staffBaseSalary', undefined);
    Session.set('staffFee', undefined);
});
