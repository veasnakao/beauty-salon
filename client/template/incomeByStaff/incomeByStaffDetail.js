//oncreated
Template.incomeByStaffDetail.onCreated(function () {
    let params = Router.current().params;
    let id = params._id;
    Meteor.call('showIncomeByStaffDetail', id, (error, result) => {
        if (error) {
            swal({
                title: "Error",
                text: error,
                type: "error",
                timer: 3000,
                showConfirmButton: true
            });
        } else {
            Session.set('incomeByStaffDetail', result);
        }
    });
});


//helper
Template.incomeByStaffDetail.helpers({
    incomeByStaffDetail(){
        if (Session.get('incomeByStaffDetail')) {
            return Session.get('incomeByStaffDetail');
        }
    }
});

//event
Template.incomeByStaffDetail.events({
    'click .js-delete-incomeByStaff'(){

        let params = Router.current().params;
        let id = params._id;
        swal({
            title: "Are you sure?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5591DF",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false, closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                Meteor.call('removeIncomeByStaff', id, (error, result) => {
                    if (error) {
                        swal({
                            title: "Error",
                            text: error,
                            type: "error"
                        });
                    } else {
                        swal({
                            title: "Success",
                            text: "Delete success",
                            type: "success",
                            showConfirmButton: false,
                            timer: 1000
                        });
                        Router.go('/showIncomeByStaff');
                        Session.set('incomeByStaffDetail', undefined);
                    }
                });
            } else {
                swal({
                    title: "Success",
                    text: "Delete success",
                    type: "error",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        });
    }
});


