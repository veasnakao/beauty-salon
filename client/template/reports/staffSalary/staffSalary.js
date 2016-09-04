Template.staffSalaryReport.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('orders');
    }.bind(this));
};

Template.staffSalaryReport.helpers({
    staffSalary(){
        if(Session.get('staffSalary')){
            let staffSalary = Session.get('staffSalary');
            return staffSalary;
        }
    }
});

Template.staffSalaryReport.events({
    'click #print'(){
        var mode = 'iframe';
        var close = mode == "popup";
        var options = {mode: mode, popClose: close};
        $("div.print").printArea(options);
    },
    'click .js-submit-report'(){
        let fromDate = $('.js-from-date').val();
        let toDate = $('.js-to-date').val();
        if(fromDate&&toDate) {
            Meteor.call('staffSalary', fromDate, toDate, (error, result)=> {
                if (error) {
                    sAlert.error(error.message);
                } else {
                    Session.set('staffSalary', result);
                }
            });
        }
    }
});