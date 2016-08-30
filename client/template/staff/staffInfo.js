//oncreate
Template.staffInfo.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('staff', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.staffInfo.rendered = function() {
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

//helper
Template.staffInfo.helpers({
    staffInfo: function () {
        return Collection.Staff.findOne({_id: Router.current().params._id});
    }
});

//event
Template.staffInfo.events({
    'click .delete-staff'(){
        let params = Router.current().params;
        let staffId = params._id;
        let staff = Collection.Staff.findOne({_id: staffId});
        IonPopup.confirm({
            title: 'Are you sure to delete?',
            template: `staff name : ${staff.name}?`,
            onOk: () => {
                Meteor.call('removeStaff', staff._id, (err, result) => {
                    if (err) {
                        sAlert.error(`Cancel ${staff.name}`);
                    } else {
                        Router.go('/showStaff');
                        sAlert.success(`Item delete success ${staff.name}`);
                    }
                });
            },
            onCancel: function () {
            }
        });
    }
});
