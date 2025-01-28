import { totalPrice } from "./main.js";

const call_option_select = {
    "5分通話無料オプション": 880,
    "かけ放題": 1980,
    "なし": 0
};

export const warranty_option_select = {
    "smartあんしん補償": 0,
    "モバイルe保険": 770,
    "なし": 0
};

const security_option_select = {
    "ウイルスバスター 1台版": 770,
    "ウイルスバスター 3台版": 990,
    "あんしんセキュリティ 550円版": 550
};

const callPriceElement = document.querySelector('.call-price');
const warrantyPriceElement = document.querySelector('.warranty-price');
const mailPriceElement = document.querySelector('.mail-option-price');
const securityPriceElement = document.querySelector('.security-price');

const callSelectElement = document.getElementById('call-option');
const warrantySelectElement = document.getElementById('warranty-option');
const securitySelectElement = document.getElementById('security-option');

const callCheckboxElement = document.querySelector('.call-checkbox');
const warrantyCheckboxElement = document.querySelector('.warranty-checkbox');
const mailCheckboxElement = document.querySelector('.mail-option-checkbox');
const securityCheckboxElement = document.querySelector('.security-checkbox');

export class OptionInfo{
    constructor(){
        this.setupEventListeners();
    }

    setupEventListeners(){
        callSelectElement.addEventListener('change', (event) => {
            this.updateOption(call_option_select,callSelectElement,callPriceElement);
        });

        warrantySelectElement.addEventListener('change', (event) => {
            this.updateOption(warranty_option_select,warrantySelectElement,warrantyPriceElement);
        });

        securitySelectElement.addEventListener('change', (event) => {
            this.updateOption(security_option_select,securitySelectElement,securityPriceElement);
        });

        callCheckboxElement.addEventListener('change', (event) => {
            this.onCheckboxChange(event,"callOptionPrice",callPriceElement.textContent.replace(/[^\d]/g, ''));
        });

        warrantyCheckboxElement.addEventListener('change', (event) => {
            this.onCheckboxChange(event,"warrantyOptionPrice",warrantyPriceElement.textContent.replace(/[^\d]/g, ''));
        });

        mailCheckboxElement.addEventListener('change', (event) => {
            this.onCheckboxChange(event,"mailOptionPrice",330);
        });

        securityCheckboxElement.addEventListener('change', (event) => {
            this.onCheckboxChange(event,"securityOptionPrice",securityPriceElement.textContent.replace(/[^\d]/g, ''));
        });
    }

    updateOption(option,selectElement,optionElement){
        const price = option[selectElement.value];
        optionElement.textContent = price.toLocaleString() + " 円";
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