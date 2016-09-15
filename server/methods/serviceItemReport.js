Meteor.methods({
    serviceItemReport(){
        let serviceItem = Collection.Item.find().fetch();
        if(serviceItem) {
            console.log(serviceItem);
            return serviceItem;
        }
    }
});