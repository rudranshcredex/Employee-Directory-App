import { LightningElement, wire, track } from 'lwc';
import GetDepartmentAndLocation from '@salesforce/apex/GetEmployeeRecords.GetDepartmentAndLocation';
import { publish, MessageContext } from "lightning/messageService";
import FilterData from "@salesforce/messageChannel/FilterData__c";
export default class filters extends LightningElement {

    @track recordList;
    @track department;
    @track location;

    selectedDepartment;
    selectedLocation;

    // @wire(GetDepartmentAndLocation)
    // wiredRecords({ error, result }) {
    //     if (result) {
    //     this.recordList = result;
    //         console.log('this.recordList--->', this.recordList);
    //         this.getDepartmentAndLocation();
    //     }
    //     else if (error) {
    //         console.error('error--->', error);
    //     }
    // }

    @wire(MessageContext)
    messageContext;


    connectedCallback() {
        GetDepartmentAndLocation().then(result => {
            this.recordList = result;
            console.log('this.recordList------>', this.recordList);
            this.handleDepartmentAndLocation();
        })
    }

    handleDepartmentAndLocation() {
        this.department = [... new Set(this.recordList.map(item => item.Department__c))];
        console.log('this.department------>', this.department);

        this.location = [... new Set(this.recordList.map(item => item.Location__c))];
        console.log('this.location------->', this.location);

    }

    getDepartment(event){
        this.selectedDepartment = event.target.value;
    }
    getlocation(event){
        this.selectedLocation= event.target.value;
    }

    handleFilterButton(){
        
        publish(this.messageContext, FilterData, { department: this.selectedDepartment , location: this.selectedLocation});
        //publish( this.messageContext,FilterData, this.location);
        console.log('after apply filter');
    }

}