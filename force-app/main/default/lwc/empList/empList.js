import { LightningElement, track } from 'lwc';
import GetEmployeeRecordsMethod from '@salesforce/apex/GetEmployeeRecords.GetEmployeeRecordsMethod';

export default class EmpList extends LightningElement {

    @track employeeList;
    originalEmployeeList


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

    connectedCallback() {
        GetEmployeeRecordsMethod().then(result => {
            this.employeeList = result;
            this.originalEmployeeList = result;
            console.log('this.employeeList------->', this.employeeList);
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
}