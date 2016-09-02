//oncreate
Template.journalItemInfo.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('journalItem', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.journalItemInfo.rendered = function () {
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
Template.journalItemInfo.helpers({
    journalItemInfo: function () {
        let journalItemInfo = Collection.JournalItem.findOne({_id: Router.current().params._id});
        if (journalItemInfo) {
            console.log(journalItemInfo);
            return journalItemInfo;
        }
    }
});

Template.journalItemInfo.events({
    'click .delete-journalItem'(){
        let params = Router.current().params;
        let itemId = params._id;
        let item = Collection.JournalItem.findOne({_id: itemId});
        IonPopup.confirm({
            title: 'Are you sure to delete?',
            template: `staff name : ${item.name}?`,
            onOk: () => {
                Meteor.call('removeJournalItem', item._id, (err, result) => {
                    if (err) {
                        sAlert.error(`Cancel ${item.journalItemName}`);
                    } else {
                        sAlert.success(`Delete ${item.journalItemName} success`);
                        Router.go('/showJournalItem');
                    }
                });
            },
            onCancel: function () {
            }
        });
    }
});