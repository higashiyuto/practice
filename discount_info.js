import { totalPrice } from "./main.js";

const discount_select = {
    "ファミリー割引き ~2人": 550,
    "ファミリー割引き 3人~": 1100,
};

const discountSelectElement = document.getElementById('discount-select');

const discountCheckboxElements = {
    familyDiscount: document.querySelector('.family-discount-checkbox'),
    wifiDiscount: document.querySelector('.wi-fi-discount-checkbox'),
    dcardDiscount: document.querySelector('.dcard-discount-checkbox')
};

const discountPriceElements = {
    familyDiscount: document.querySelector('.family-discount-price'),
    wifiDiscount: document.querySelector('.wi-fi-discount-price'),
    dcardDiscount: document.querySelector('.dcard-discount-price')
};

export class DiscountInfo{
    constructor(){
        this.setupEventListeners();
    }

    setupEventListeners(){
        discountSelectElement.addEventListener('change', this.updatePlan.bind(this));

        Object.keys(discountCheckboxElements).forEach(discountType => {
            const checkboxElement = discountCheckboxElements[discountType];
            const priceElement = discountPriceElements[discountType];
            checkboxElement.addEventListener('change', (event) => {
                this.onCheckboxChange(event,`${discountType}Price`, priceElement.textContent.replace(/[^\d]/g, ''));
            });
        });
    }

    updatePlan(event){
        const selectedDiscount = discount_select[event.target.value];
        discountPriceElements.familyDiscount.textContent = selectedDiscount.toLocaleString() + " 円 ";
        
        totalPrice.familyDiscountPrice = 0;
        if(discountCheckboxElements.familyDiscount.checked){
            totalPrice.familyDiscountPrice = selectedDiscount;
        }
        window.Total();
    }

    onCheckboxChange(event,key,price) {
        const checkbox = event.target;

        if (checkbox.checked) {
            totalPrice[key] = price;
        } else {
            totalPrice[key] = 0;
        }
        window.Total();
    }
}