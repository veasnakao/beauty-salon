Template.serviceItemReport.created = function () {
    Meteor.call('serviceItemReport', (error, result)=> {
        if (error) {
            swal({
                title: "Error",
                text: error,
                type: "error",
                timer: 3000,
                showConfirmButton: true
            })
        } else {
            Session.set('serviceItemReport', result);
        }
    })
};

Template.serviceItemReport.helpers({
    serviceItem(){
        if (Session.get('serviceItemReport')) {
            return Session.get('serviceItemReport');
        }
    },
    company(){
        let company = Collection.Company.find();
        if(company) {
            return company;
        }
    }
});

Template.serviceItemReport.events({
    'click #print'(){
        var mode = 'iframe'; // popup
        var close = mode == "popup";
        var options = {mode: mode, popClose: close};
        $("div.print").printArea(options);
    },
})