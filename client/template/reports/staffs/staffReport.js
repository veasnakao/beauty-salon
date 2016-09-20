// Tracker.autorun(function () {
//     if (Session.get('allStaff') ){
//         Meteor.subscribe("staffs");
//     } Session.get('staffBaseSalary') || Session.get('staffFee')) {
//         Meteor.subscribe("staffs");
//     }
// });

//oncreated
Template.staffReport.created = function () {
    let selector = {
        status: 'active'
    };
    this.autorun(function () {
        this.subscription = Meteor.subscribe('staffActive',selector);
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
    allStaff(){
        let allStaffs = Collection.Staff.find();
        if (allStaffs) {
            return allStaffs;
        }
    },
    countAllStaff(){
        let countStaffs = Collection.Staff.find().count();
        if (countStaffs) {
            return countStaffs;
        }
    },
    staffBaseSalary() {
        let staffBaseSalary = Collection.Staff.find({
            baseSalary: {
                $gte: Session.get('staffBaseSalary')
            }
        });
        if (staffBaseSalary) {
            return staffBaseSalary;
        }
    },
    countStaffBaseSalary() {
        let staffBaseSalary = Collection.Staff.find({
            baseSalary: {
                $gte: Session.get('staffBaseSalary')
            }
        }).count();

        if (staffBaseSalary) {
            return staffBaseSalary;
        }
    },
    staffFee() {
        let staffFee = Collection.Staff.find({
            fee: {
                $gte: Session.get('staffFee')
            }
        });
        if (staffFee) {
            return staffFee;
        }
    },
    countStaffFee() {
        let staffFee = Collection.Staff.find({
            fee: {
                $gte: Session.get('staffFee')
            }
        }).count();
        if (staffFee) {
            return staffFee;
        }
    },
    company(){
        let company = Collection.Company.find();
        if (company) {
            return company;
        }
    },
});

Template.staffReport.events({
    'click #print'(){
        var mode = 'iframe'; // popup
        var close = mode == "popup";
        var options = {mode: mode, popClose: close};
        $("div.print").printArea(options);
    },
    'click .js-staff-fee'(e){
        if ($(e.currentTarget).prop('checked')) {
        }
    },
    'click .js-staff-base-salary'(e){
        if ($(e.currentTarget).prop('checked')) {
        }
    },
    'click .js-submit-report'(){
        if (($('.js-staff-fee').is(':checked')) && ($('.js-staff-base-salary').is(':checked'))) {
            $('.list-allStaff').show();
            $('.list-staffFee').hide();
            $('.list-staffBaseSalary').hide();
            Session.set('staffFee', undefined);
            Session.set('staffBaseSalary', undefined);
        }
        else if ($('.js-staff-fee').is(':checked')) {
            Session.set('staffFee', 1);
            Session.set('staffBaseSalary', undefined);
            $('.list-staffFee').show();
            $('.list-allStaff').hide();
            $('.list-staffBaseSalary').hide();
        }
        else if ($('.js-staff-base-salary').is(':checked')) {
            Session.set('staffBaseSalary', 1);
            Session.set('staffFee', undefined);
            $('.list-staffBaseSalary').show();
            $('.list-allStaff').hide();
            $('.list-staffFee').hide();
        } else {
            Session.set('staffFee', undefined);
            Session.set('staffBaseSalary', undefined);
            $('.list-allStaff').hide();
            $('.list-staffFee').hide();
            $('.list-staffBaseSalary').hide();
        }
    }
});

//onDestroyed
Template.staffReport.onDestroyed(function () {
    Session.set('staffBaseSalary', undefined);
    Session.set('staffFee', undefined);
});
