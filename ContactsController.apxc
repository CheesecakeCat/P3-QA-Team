public class ContactsController {
    @AuraEnabled
    public static List<String> getDepartment () { /*This is the method that queries for the Contacts and returns the names
        											as a List of Strings for insertion into the drop down.*/
        Set<String> uniqDepartment = new Set<String>();
        List<Contact> results=[Select Id, Department, FirstName from Contact];
        for(Contact c : results){
            if(c.FirstName!=null){
                uniqDepartment.add(c.FirstName); 
            }
        }
        List<String> finalResult =  new List<String>();
        finalResult.addAll(uniqDepartment); 
        finalResult.sort();
        return  finalResult;
    }
    
    //Ignore this. Again, this was for the bonus table functionality.
    @AuraEnabled
    public static List<Contact> getContactsByDept (String deptName) {
        List<Contact> results=[Select Id,FirstName,LastName,Email,Department from Contact where Department=:deptName];
        return  results;
    }
    
    
    
}