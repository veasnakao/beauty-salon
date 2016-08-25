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