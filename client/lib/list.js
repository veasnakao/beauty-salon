List = {
    getCustomers(){
        var listCustomer = [{label:'(Select One)',value:''}];
        var customers = Collection.Customer.find();
        customers.forEach((teacher)=>{
            // listCustomer.push({label:`${customers._id} | ${teacher.teacherName}`,value:teacher._id});
            listCustomer.push({label:`${customers.name}`,value:customers._id});
        });
        return listCustomer;
    },
    getJournalItem(){
        var listCustomer = [];
        var journalItem = Collection.JournalItem.find();
        journalItem.forEach((obj)=>{
            // listCustomer.push({label:`${customers._id} | ${teacher.teacherName}`,value:teacher._id});
            listCustomer.push({label:`${obj.journalItemName}`,value:obj._id});
        });
        return listCustomer;
    }
}