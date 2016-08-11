Meteor.methods({
    insertOrder(selector){
        selector._id = idGenerator.gen(Collection.Order, 4);
        let orderId = Collection.Order.insert(selector);
        return orderId;
    },
    removeSaleIfNoSaleDetailExist(orderId) {
        Meteor.defer(() => {
            Meteor._sleepForMs(500);
            let orderDetail = Collection.OrderDetail.find({
                orderId: orderId
            });
            console.log(orderId);
            if (orderDetail.count() <= 0) {
                Collection.Order.remove(orderId);
            }
        });
    }
});

//insert staff
Meteor.methods({
    insertStaff(staffId,orderId){
        let staffs = Collection.Staff.find({_id:staffId});
        // orderDetails.forEach((objOrderDetail)=> {
        //     subTotal += objOrderDetail.amount;
        // });
        // let getStaffId = '';
        staffs.forEach((objStaffs)=> {
            staffId = objStaffs._id;
        });
        console.log(`staffId : ${staffId}`);
        Collection.Order.update(orderId, {
            $set: {
                staffId: staffId
            }
        })
    }
});

//update order status
Meteor.methods({
    updateOrderStatus(orderId){
        let order = Collection.Order.findOne(orderId);
        if(order){
            console.log(order);
            Collection.Order.update(orderId, {
                $set: {
                    status: 'false'
                }
            });    
        }
    }
});