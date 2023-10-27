import { LightningElement, wire, track } from 'lwc';
import GetDepartmentAndLocation from '@salesforce/apex/GetEmployeeRecords.GetDepartmentAndLocation';
export default class Filters extends LightningElement {

    @track recordList;
    @track department;
    @track location;

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

    connectedCallback() {
        GetDepartmentAndLocation().then(result => {
            this.recordList = result;
            console.log('this.recordList------>', this.recordList);
            this.getDepartmentAndLocation();
        })
    }

    getDepartmentAndLocation() {
        this.department = [... new Set(this.recordList.map(item => item.Department__c))];
        console.log('this.department------>', this.department);

        this.location = [... new Set(this.recordList.map(item => item.Location__c))];
        console.log('this.location------->', this.location);

    }

}