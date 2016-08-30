//oncreate
Template.itemInfo.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('item', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.itemInfo.rendered = function() {
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
        IonPopup.confirm({
            title: 'Are you sure to delete?',
            template: `item name : ${item.name}?`,
            onOk: () => {
                Meteor.call('removeOrderItem', item._id, (err, result) => {
                    if (err) {
                        sAlert.error(`Cancel ${item.name}`);
                    } else {
                        Router.go('/showItem');
                        sAlert.success(`Item delete success ${item.name}`);
                    }
                });
            },
            onCancel: function () {
            }
        });
    }
});