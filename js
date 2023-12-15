import { LightningElement, wire, api } from 'lwc';
import retrunAccount from '@salesforce/apex/lwcQuesoneController.retrunAccount';
import wrapperClass from '@salesforce/apex/lwcQuesoneController.wrapperClass';
export default class LwcQuesOne extends LightningElement {

    recordId;
    accountDetails;
    relatedOpportunity;
    relatedContact;
    @wire(retrunAccount)
    wiredData({ error, data }) {
        if (data) {
            this.accountDetails = data;
            console.log('Data>>>>1122>>>  ', data);
        } else if (error) {
            console.error('Error:>>>>>2333>>>  ', error);
        }
    }

    handleAccountChnage(event) {
        try {
            console.log('>>>>>>>>  ', event.target.value);
            this.recordId = event.target.value;

            wrapperClass({ accRecordId: event.target.value })
                .then(result => {

                    console.log('Result???? ', result);
                    this.relatedOpportunity = result.accIdVsListOfOpp;
                    this.relatedContact = result.accIdVsListOfCon;
                })
                .catch(error => {
                    console.error('Error:???????? ', error);
                });
        } catch (error) {
            console.log('>>>>error>>>>  ', error);
        }

    }
}
