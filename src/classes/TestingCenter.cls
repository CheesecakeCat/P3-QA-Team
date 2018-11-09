public class TestingCenter {
    public List<training__c> trainingList{
        get{ 
            if(trainingList == null){
                trainingList = [select id,name,startdate__c,training_location_name__c,(SELECT id,name from training_assignments__r),(select id,name from caliber_notes__r) from training__c];
                //system.debug(trainingList);
            }
            //system.debug(trainingList);
            return trainingList;
        }set;
    }
    
    public Set<String> getYears(){
        Set<String> years = new Set<String>();
        for(training__c t: trainingList){     
            if(t.StartDate__c != null){
                 years.add(String.valueOf(t.StartDate__c.year()));
            	system.debug(t.StartDate__c.year());
            } 
        }
        return years;
    }
    
    public Set<String> getCities(){
        Set<String> cities = new Set<String>();
        for(training__c t: trainingList){
            if(t.Training_Location_Name__c != null){
                cities.add(t.Training_Location_name__c);
            } 
        }
        return cities;
    }
}