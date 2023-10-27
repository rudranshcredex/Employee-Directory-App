import { LightningElement, track, wire } from 'lwc';
import GetEmployeeRecordsMethod from '@salesforce/apex/GetEmployeeRecords.GetEmployeeRecordsMethod';
import { subscribe, MessageContext } from 'lightning/messageService';
import FilterData from "@salesforce/messageChannel/FilterData__c";

export default class EmpList extends LightningElement {

    @track employeeList;
    @track department;
    @track location;
    originalEmployeeList;
    subscription;
   
    


    columns = [{
        label: 'Name', fieldName: 'Name'
    },
    {
        label: 'Title', fieldName: 'Title__c'
    },
    {
        label: 'Contact Number', fieldName: 'Contact_Number__c'
    },
    {
        label: 'Email ID', fieldName: 'Email__c'
    },
    {
        label: 'Department', fieldName: 'Department__c'
    },
    {
        label: 'Location', fieldName: 'Location__c'
    }
    ]


    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        GetEmployeeRecordsMethod().then(result => {
            this.employeeList = result;
            this.originalEmployeeList = result;
            console.log('this.employeeList------->', this.employeeList);

            this.handleSubscribe();
        })
    }

    handleSearch(event) {
        const key = event.target.value.toLowerCase();
        if (key) {
           
            this.employeeList = this.originalEmployeeList.filter(item => item.Name.toLowerCase().includes(key));
        } else {
            
            this.employeeList = this.originalEmployeeList;
        }
    }

    handleSubscribe(){
        if(this.subscription){
            return;
        }
        this.subscription = subscribe(this.messageContext, FilterData, (message) => {
            let data = message;
            this.department = data.department;
            this.location = data.location;
    
            console.log('this.department subcribe-------->', JSON.stringify(this.department));
            console.log('this.department--->', this.department);
            console.log('this.location------->', this.location);
    
            // Call filterRecords here to apply filtering after receiving the message
            this.filterRecords();
        });
    }
    
    filterRecords(){

        if(this.department && this.location){
            this.employeeList = this.originalEmployeeList.filter(item => item.Department__c === this.department && item.Location__c === this.location);

        }
        else if(this.department){
            this.employeeList = this.originalEmployeeList.filter(item=>item.Department__c === this.department);
        }
        else if(this.location){
            this.employeeList = this.originalEmployeeList.filter(item => item.Location__c === this.location);
        }
    }

}