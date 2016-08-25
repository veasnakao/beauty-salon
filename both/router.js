Router.configure({
    layoutTemplate: 'layout'
});

// Router.configure({
//     layoutTemplate: "layout",
//     before: function () {
//         if(!Meteor.user()) {
//             // render the login template but keep the url in the browser the same
//             this.router.layout("loginLayout");
//             this.render('login');
//             // this.route('login');
//         }else{
//             //Here we have to change the layoutTemplate back to the default
//             this.router.layout("layout");
//         }
//     }
// });

// Router.configure({
//     layoutTemplate:"login"
// });


Router.map(function () {
    this.route('index', {path: '/'});

    //staff
    this.route('showStaff');
    this.route('staffInfo', {
        path: '/staffInfo/:_id'
    });

    //item
    this.route('showItem');
    this.route('itemInfo',{
        path:'/itemInfo/:_id'
    });

    //customer
    this.route('showCustomer');
    this.route('customerInfo',{
        path:'/customerInfo/:_id'
    });

    //expenseItem
    this.route('showJournalItem');
    this.route('journalItemInfo',{
        path:'/journalItemInfo/:_id'
    });

    //journalEntry
    this.route('showJournalEntry');
    this.route('journalEntryDetail',{
        path:'/journalEntryDetail/:_id'
    });

    //order
    this.route('showOrder');
    this.route('orderDetail',{
        path:'/orderDetail/:_id'
    });
    this.route('itemOrder',{
        path:'/itemOrder/orderId/:orderId'
        // path:'/itemOrder/customerId/:customerId/orderId/:orderId'
    });

    this.route('reports');
    this.route('staffReport');
    this.route('orderReport');
    this.route('journalEntryReport');
    this.route('profitAndLossReport');
    this.route('login');
    this.route('signup');
});