import { totalPrice } from "./main.js";
import { DetailsContentInfo } from './details_info.js';

const detailsContentinfo = new DetailsContentInfo();

export const optionSelects = {
    call: {
        "5分通話無料オプション": 880,
        "かけ放題": 1980,
        "なし": 0
    },
    warranty: {
        "smartあんしん補償": 0,
        "モバイルe保険": 770,
        "なし": 0
    },
    mail: {
        "ドコモメール持ち運び": 330,
        "なし": 0
    },
    security: {
        "ウイルスバスター 1台版": 770,
        "ウイルスバスター 3台版": 990,
        "あんしんセキュリティ 550円版": 550
    }
};

const priceElements = {
    call: document.querySelector('.call-price'),
    warranty: document.querySelector('.warranty-price'),
    mail: document.querySelector('.mail-option-price'),
    security: document.querySelector('.security-price')
};

const selectElements = {
    call: document.getElementById('call-option'),
    warranty: document.getElementById('warranty-option'),
    mail: document.getElementById('mail-option'),
    security: document.getElementById('security-option')
};

const checkboxElements = {
    call: document.querySelector('.call-checkbox'),
    warranty: document.querySelector('.warranty-checkbox'),
    mail: document.querySelector('.mail-option-checkbox'),
    security: document.querySelector('.security-checkbox')
};

export class OptionInfo{
    constructor(){
        this.setupEventListeners();
    }

    setupEventListeners(){
        // 各選択肢に対するイベントリスナーを設定
        Object.keys(optionSelects).forEach(optionType => {
            const selectElement = selectElements[optionType];
            const priceElement = priceElements[optionType];
            const checkboxElement = checkboxElements[optionType];

            // セレクトボックスの変更イベント
            selectElement.addEventListener('change', (event) => {
                this.handleOptionChange(optionType, event.target.value, priceElement);
            });

            // チェックボックスの変更イベント
            checkboxElement.addEventListener('change', (event) => {
                this.onCheckboxChange(optionType, event, priceElement);
            });
        });
    }

    // セレクトボックス変更時の処理
    handleOptionChange(optionType, selectedOption, priceElement) {
        const price = optionSelects[optionType][selectedOption];
        priceElement.textContent = `${price} 円`;

        // チェックボックスがチェックされている場合、合計に反映
        if (checkboxElements[optionType].checked) {
            totalPrice[`${optionType}OptionPrice`] = price;
            window.Total();
        }
    }

    // チェックボックス変更時の処理
    onCheckboxChange(optionType, isChecked, priceElement) {
        const price = parseInt(priceElement.textContent.replace(/[^\d]/g, '')) || 0;
        totalPrice[`${optionType}OptionPrice`] = isChecked ? price : 0;
        window.Total();
    }
}
