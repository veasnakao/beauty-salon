Template.journalItemReport.created = function () {
    Meteor.call('journalItemReport', (error, result)=> {
        if (error) {
            swal({
                title: "Error",
                text: error,
                type: "error",
                timer: 3000,
                showConfirmButton: true
            })
        } else {
            Session.set('journalItemReport', result);
        }
    })
};

Template.journalItemReport.helpers({
    journalItem(){
        if (Session.get('journalItemReport')) {
            return Session.get('journalItemReport');
        }
    },
    company(){
        let company = Collection.Company.find();
        if(company) {
            return company;
        }
    }
});

Template.journalItemReport.events({
    'click #print'(){
        var mode = 'iframe'; // popup
        var close = mode == "popup";
        var options = {mode: mode, popClose: close};
        $("div.print").printArea(options);
    },
})