//oncreate
Template.itemInfo.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('item', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.itemInfo.rendered = function () {
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
Template.itemInfo.helpers({
    itemInfo: function () {
        return Collection.Item.findOne({_id: Router.current().params._id});
    }
});

//event
Template.itemInfo.events({
    'click .delete-orderItem'(){
        let params = Router.current().params;
        let itemId = params._id;
        let item = Collection.Item.findOne({_id: itemId});
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
                Meteor.call('removeOrderItem', item._id, (error, result) => {
                    if (error) {
                        swal({
                            title: "Error",
                            text: error,
                            type: "error"
                        });
                    } else {
                        Router.go('/showItem');
                        swal("Deleted!", "Your service has been deleted.", "success");
                    }
                });
            } else {
                swal({
                    title: "Cancelled",
                    type: "error"
                });
            }
        });
    }
});