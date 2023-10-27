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
    recordData;
    name;
    title;
    phone;
    email;
    id;
    showModal=false;


    columns = [{
        label: 'Name', fieldName: 'Name'
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

    handleSubscribe() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.messageContext, FilterData, (message) => {
            let data = message;
            this.department = data.department;
            this.location = data.location;

            console.log('this.department subcribe-------->', JSON.stringify(this.department));
            console.log('this.department--->', this.department);
            console.log('this.location------->', this.location);
            this.filterRecords();
        });
    }

    filterRecords() {

        if (this.department && this.location) {
            this.employeeList = this.originalEmployeeList.filter(item => item.Department__c === this.department && item.Location__c === this.location);

        }
        else if (this.department) {
            this.employeeList = this.originalEmployeeList.filter(item => item.Department__c === this.department);
        }
        else if (this.location) {
            this.employeeList = this.originalEmployeeList.filter(item => item.Location__c === this.location);
        }
    }

    handleRecordDetails(){
       const id = this.template.querySelector('lightning-datatable');
       this.recordData = id.getSelectedRows();
       console.log('this.recorddata=------>', this.recordData);
       this.handleModalDetails();
    }
    
    handleModalDetails(){
        this.name=this.recordData.map(item=>item.Name);
        this.email = this.recordData.map(item=>item.Email__c);
        this.phone = this.recordData.map(item=>item.Contact_Number__c);
        this.title = this.recordData.map(item=>item.Title__c);
        this.id = this.recordData.map(item=>item.Id);
        this.showModal=!this.modal;
    }
}