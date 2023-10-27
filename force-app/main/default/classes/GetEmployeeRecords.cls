public with sharing class GetEmployeeRecords {
    @AuraEnabled(cacheable = true)
    public static list<Employee_Directory__c> GetEmployeeRecordsMethod() {

        list<Employee_Directory__c> listOfRecords = new list<Employee_Directory__c>();
        listOfRecords = [select Id,  Department__c, Contact_Number__c, Email__c, Name, Image__c, Location__c, Title__c from Employee_Directory__c limit 100];

        system.debug('listOfRecords--->'+ listOfRecords);
        return listOfRecords;
    }
    @AuraEnabled(cacheable = true)
    public static list<Employee_Directory__c> GetDepartmentAndLocation(){
        list<Employee_Directory__c> listOfRecords = new list<Employee_Directory__c>();
        listOfRecords = [select Department__c, Location__c from Employee_Directory__c limit 100];
        return listOfRecords;
    }

}