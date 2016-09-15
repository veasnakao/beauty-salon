Meteor.methods({
    serviceItemReport(){
        let serviceItem = Collection.Item.find().fetch();
        if(serviceItem) {
            return serviceItem;
        }
    }
});