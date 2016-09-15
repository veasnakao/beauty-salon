
// Template.addOrder.events({
    // 'click .js-customerId': ()=> {
    //     if ($(".js-customerId").val() === "vip") {
    //         $(".js-customerName").show();
    //     }else{
    //         $(".js-customerName").hide();
    //     }
    // }
// });

// AutoForm.hooks({
//     addOrder: {//id autoform
//         before: {
//             insert: function (doc) {
//                 doc._id = idGenerator.gen(Collection.Order, 4);
//                 return doc;
//             }
//         },
//         onSuccess(formType, id){
//             sAlert.success('Order success');
//         },
//         onError(formType, error){
//             sAlert.error(error.message);
//         }
//     }
// });