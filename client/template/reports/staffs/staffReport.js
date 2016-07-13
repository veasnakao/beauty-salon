//oncreated
Template.staffReport.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('staffs');
    }.bind(this));
};

//onrender
Template.staffReport.rendered = function() {
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


Template.staffReport.events({
    'click .js-staff-fee'(e){
        if ($(e.currentTarget).prop('checked')) {
            $('.js-staff-base-salary').prop('checked', false);
        }
    },
    'click .js-staff-base-salary'(e){
        if ($(e.currentTarget).prop('checked')) {
            $('.js-staff-fee').prop('checked', false);
        }
    },
    'click .js-submit-report'(e){
        if ($('.js-staff-fee').is(':checked')) {
            let staffFee = Collection.Staff.find({
                fee: {
                    $gte: 1
                }
            });
            if(staffFee){
                return staffFee;
            }
            
        }
        else if ($('.js-staff-base-salary').is(':checked')) {
            let staffBaseSalary = Collection.Staff.find({
                baseSalary: {
                    $gte: 1
                }
            });
            if(staffBaseSalary){
                return staffBaseSalary;
            }
        }
    }
});
