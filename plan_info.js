import { DetailsContentInfo } from './details_info.js';
import { totalPrice } from './main.js';

const detailsContentinfo = new DetailsContentInfo();

const eximo_plans = {
    "eximo ~1GB": 4565,
    "eximo 1~3GB": 5665,
    "eximo ~無制限": 7315
};

const irumo_plans = {
    "irumo 0.5GB": 550,
    "irumo 3GB": 2167,
    "irumo 6GB": 2827,
    "irumo 9GB": 3377
};

const ahamo_plans = {
    "ahamo 30GB": 2970,
    "ahamo 110GB": 4950
};

/* プラン別のチェックボックス要素 */
const eximoCheckboxElement = document.querySelector('.eximo-checkbox');
const irumoCheckboxElement = document.querySelector('.irumo-checkbox');
const ahamoCheckboxElement = document.querySelector('.ahamo-checkbox');

const eximoSelectElement = document.getElementById('plan-eximo');
const irumoSelectElement = document.getElementById('plan-irumo');
const ahamoSelectElement = document.getElementById('plan-ahamo');

const eximoPriceElement = document.querySelector('.eximo-price');
const irumoPriceElement = document.querySelector('.irumo-price');
const ahamoPriceElement = document.querySelector('.ahamo-price');

export class PlanInfo{
    constructor(){
        this.setupEventListeners();
    }

    setupEventListeners(){
        eximoSelectElement.addEventListener('change',(event) => {
            this.updatePlan(eximo_plans,eximoSelectElement,eximoPriceElement);
            this.updateTotalWithCheckboxState();
        });

        irumoSelectElement.addEventListener('change',(event) => {
            this.updatePlan(irumo_plans,irumoSelectElement,irumoPriceElement);
            this.updateTotalWithCheckboxState();
        });

        ahamoSelectElement.addEventListener('change',(event) => {
            this.updatePlan(ahamo_plans,ahamoSelectElement,ahamoPriceElement);
            this.updateTotalWithCheckboxState();
        });

        eximoCheckboxElement.addEventListener('change', (event) => {
            this.onCheckboxChange(event,eximoPriceElement.textContent.replace(/[^\d]/g, ''));
        });

        irumoCheckboxElement.addEventListener('change',(event) => {
            if(event.target.checked){
                detailsContentinfo.showTabContent("irumo");
            }else{
                detailsContentinfo.removeTabContent("irumo");
            }
            this.onCheckboxChange(event,irumoPriceElement.textContent.replace(/[^\d]/g, ''));
        });

        ahamoCheckboxElement.addEventListener('change',(event) => {
            this.onCheckboxChange(event,ahamoPriceElement.textContent.replace(/[^\d]/g, ''));
        });
    }

    updatePlan(plan,selectElement,priceElement){
        const price = plan[selectElement.value];
        priceElement.textContent = price.toLocaleString() + " 円 ";
    }

    onCheckboxChange(event,price) {
        const checkbox = event.target;

        if (checkbox.checked) {
            totalPrice.planPrice = price;
            window.Total();
        } else {
            totalPrice.planPrice = 0;
            window.Total();
        }
    }

    updateTotalWithCheckboxState() {
        const eximoChecked = eximoCheckboxElement.checked;
        const irumoChecked = irumoCheckboxElement.checked;
        const ahamoChecked = ahamoCheckboxElement.checked;

        let totalToUpdate = 0;

        if (eximoChecked) 
            totalPrice.planPrice = parseFloat(eximoPriceElement.textContent.replace(/[^\d]/g, ''));
        
        if (irumoChecked)
            totalPrice.planPrice = parseFloat(irumoPriceElement.textContent.replace(/[^\d]/g, ''));
        
        if (ahamoChecked)
            totalPrice.planPrice = parseFloat(ahamoPriceElement.textContent.replace(/[^\d]/g, ''));
        
        window.Total();
    }
}