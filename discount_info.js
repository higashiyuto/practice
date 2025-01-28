import { totalPrice } from "./main.js";

const discount_select = {
    "ファミリー割引き ~2人": 550,
    "ファミリー割引き 3人~": 1100,
};

const discountSelectElement = document.getElementById('discount-select');

const family_discount_checkbox = document.querySelector('.family-discount-checkbox');
const wi_fi_discount_checkbox = document.querySelector('.wi-fi-discount-checkbox');
const dcard_discount_checkbox = document.querySelector('.dcard-discount-checkbox');

const family_discount_price = document.querySelector('.family-discount-price');
const wi_fi_discount_price = document.querySelector('.wi-fi-discount-price');
const dcard_discount_price = document.querySelector('.dcard-discount-price');

export class DiscountInfo{
    constructor(){
        this.setupEventListeners();
    }

    setupEventListeners(){
        discountSelectElement.addEventListener('change', (event) => {
            this.updatePlan(discount_select,discountSelectElement,family_discount_price);
        });

        family_discount_checkbox.addEventListener('change', (event) => {
            this.onCheckboxChange(event,"familyDiscountPrice",family_discount_price.textContent.replace(/[^\d]/g, ''));
        });

        wi_fi_discount_checkbox.addEventListener('change', (event) => {
            this.onCheckboxChange(event,"wifiDiscountPrice",wi_fi_discount_price.textContent.replace(/[^\d]/g, ''));
        });

        dcard_discount_checkbox.addEventListener('change', (event) => {
            this.onCheckboxChange(event,"dCardDiscountPrice",dcard_discount_price.textContent.replace(/[^\d]/g, ''));
        });
    }

    updatePlan(discount,selectElement,priceElement){
        const price = discount[selectElement.value];
        priceElement.textContent = price.toLocaleString() + " 円 ";
    }

    onCheckboxChange(event,key,price) {
        const checkbox = event.target;

        if (checkbox.checked) {
            totalPrice[key] = price;
            window.Total();
        } else {
            totalPrice[key] = 0;
            window.Total();
        }
    }
}