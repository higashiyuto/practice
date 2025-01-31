import { DeviceInfoManager } from './device_manager.js';
import { DeviceDatabase } from './device_database.js';
import { DetailsContentInfo } from './details_info.js';
import { optionSelects } from './option_info.js';
import { OptionInfo } from './option_info.js';

import { totalPrice } from './main.js';

// 端末データベースとデータ管理クラスのインスタンス化
const db = new DeviceDatabase(); // 端末データベースのインスタンス
const manager = new DeviceInfoManager(db);

const detailsContentinfo = new DetailsContentInfo();
const optionInfo = new OptionInfo();

/*セレクトボタンの要素*/
const phoneSelectElement = document.getElementById('phone-select');
const contractSelectElement = document.getElementById('contract-type');
const installmentsNumElement = document.getElementById('installments-num');
const contractSelectElement = document.getElementById('contract-type');

const priceElements = {
    phonePrice: document.querySelector('.phone-price'),
    kaedokiPrice: document.querySelector('.kaedoki-price'),
    kaedokiMonthlyPrice: document.querySelector('.kaedoki-monthly-price'),
    normalPrice: document.querySelector('.normal-price'),
    monthlyPrice: document.querySelector('.monthly-price'),
    warrantyPrice: document.querySelector('.warranty-price') // 補償の価格要素
};

const checkboxElements = {
    kaedoki: document.querySelector('.kaedoki-price-checkbox'),
    price: document.querySelector('.price-checkbox')
};

export let deviceInfo = {
<<<<<<< HEAD
    phonePrice: 0,   //端末代
    kaedokiPrice: 0, //カエドキの値段
    kaedokiMonthlyPrice: 0, //カエドキの値段/23の値段
    normalPrice: 0,  //端末代
    monthlyPrice: 0, //端末代 / installmentsNum
    checkPhonePrice: 0, //チェックされた端末の月額料金
    warrantyPrice: 0, // 補償価格
=======
    phonePrice: 0,
    kaedokiPrice: 0,
    kaedokiMonthlyPrice: 0,
    normalPrice: 0,
    monthlyPrice: 0,
    checkPhonePrice: 0,
>>>>>>> 57e532745aa129f1162ce31bfdb6fdc9b875aa74
    priceDiscountPrice: 0
};

export class DeviceInfo {
    constructor() {
        this.addDevicesToSelect();
        this.setupEventListeners();
    }

    // 端末の選択肢をセレクトボックスに追加するメソッド
    addDevicesToSelect() {
        const deviceNames = manager.getDeviceNames();
        deviceNames.forEach(deviceName => {
            const option = document.createElement('option');
            option.value = deviceName;
            option.textContent = deviceName;
            phoneSelectElement.appendChild(option);
        });
    }

    // イベントリスナーの設定
    setupEventListeners() {
        phoneSelectElement.addEventListener('change', this.updatePrices.bind(this));
        installmentsNumElement.addEventListener('change', this.updateMonthlyPrice.bind(this));

        // 保険オプション変更イベント
        document.getElementById('warranty-option').addEventListener('change', this.updateWarrantyPrice.bind(this));

        Object.keys(checkboxElements).forEach(optionType => {
            checkboxElements[optionType].addEventListener('change', (event) => {
                this.onCheckboxChange(event, optionType);
            });
        });

        contractSelectElement.addEventListener('change', (event) => {
            if(event.target){
                deviceInfo.priceDiscountPrice = db.getDiscount(phoneSelectElement.value,contractSelectElement.value);
                this.updatePrices();
            }
        });

        contractSelectElement.addEventListener('change', (event) => {
            if(event.target){
                deviceInfo.priceDiscountPrice = db.getDiscount(phoneSelectElement.value,contractSelectElement.value);
                this.updatePrices();
            }
        });
    }

    // 端末を選択した際に価格を更新するメソッド
    updatePrices() {
        const selectedDeviceName = phoneSelectElement.value;
<<<<<<< HEAD
=======
        warranty_option_select["smartあんしん補償"] =  db.getDeviceWarranty(selectedDeviceName);
        deviceInfo.phonePrice = manager.getDevicePrice(selectedDeviceName);
        deviceInfo.kaedokiPrice = parseInt(manager.getDeviceKaedokiPrice(selectedDeviceName)) - parseInt(deviceInfo.priceDiscountPrice);
        deviceInfo.kaedokiMonthlyPrice = parseInt(deviceInfo.kaedokiPrice)/23;
        deviceInfo.normalPrice = parseInt(manager.getDevicePrice(selectedDeviceName)) - parseInt(deviceInfo.priceDiscountPrice);
        
        phonePriceElement.textContent = deviceInfo.phonePrice.toLocaleString();
        kaedokiPriceElement.textContent = deviceInfo.kaedokiPrice.toLocaleString() + " 円 =";
        kaedokiMonthlyPriceElement.textContent = Math.floor(deviceInfo.kaedokiMonthlyPrice).toLocaleString() + " 円";
        normalPriceElement.textContent = deviceInfo.normalPrice.toLocaleString() + " 円 =";
>>>>>>> 57e532745aa129f1162ce31bfdb6fdc9b875aa74

        // 端末の価格を取得
        deviceInfo.phonePrice = manager.getDevicePrice(selectedDeviceName);
        deviceInfo.kaedokiPrice = manager.getDeviceKaedokiPrice(selectedDeviceName) - parseInt(deviceInfo.priceDiscountPrice);
        deviceInfo.kaedokiMonthlyPrice = parseInt(deviceInfo.kaedokiPrice) / 23;
        deviceInfo.normalPrice = manager.getDevicePrice(selectedDeviceName) - parseInt(deviceInfo.priceDiscountPrice);

        priceElements.phonePrice.textContent = deviceInfo.phonePrice.toLocaleString() + " 円";
        priceElements.kaedokiPrice.textContent = `${deviceInfo.kaedokiPrice.toLocaleString()} 円 =`;
        priceElements.kaedokiMonthlyPrice.textContent = `${Math.floor(deviceInfo.kaedokiMonthlyPrice).toLocaleString()} 円 / 月`;
        priceElements.normalPrice.textContent = `${deviceInfo.normalPrice.toLocaleString()} 円 =`;

        // 保険オプションの更新
        this.updateWarrantyPrice();

        // 月額価格の更新
        this.updateMonthlyPrice();
        this.resetTotal();
    }

    // 補償オプションの更新
    updateWarrantyPrice() {
        const selectedWarrantyOption = document.getElementById('warranty-option').value;
        const selectedDeviceName = phoneSelectElement.value;

        let warrantyPrice = 0;

        // 現在選択されている補償オプションが「smartあんしん補償」ならば端末の金額を基に補償金額を設定
        if (selectedWarrantyOption === 'smartあんしん補償') {
            warrantyPrice = db.getDeviceWarranty(selectedDeviceName); // 端末ごとの「smartあんしん補償」金額を取得
            optionSelects.warranty["smartあんしん補償"] = warrantyPrice;
        }
        // 「モバイルe保険」が選ばれていれば、e保険の金額を設定
        else if (selectedWarrantyOption === 'モバイルe保険') {
            warrantyPrice = 770;  // モバイルe保険の金額（770円など）
        }

        // 補償金額を更新
        deviceInfo.warrantyPrice = warrantyPrice;
        priceElements.warrantyPrice.textContent = `${warrantyPrice.toLocaleString()} 円`;

        // totalPriceを更新する
        if (document.querySelector('.warranty-checkbox').checked) {
            totalPrice.warrantyOptionPrice = warrantyPrice;
            optionSelects.warranty["smartあんしん補償"] = warrantyPrice;
        } else {
            totalPrice.warrantyOptionPrice = 0;
        }

        window.Total();
    }

    // 分割払い回数を変更した際に月額価格を更新するメソッド
    updateMonthlyPrice() {
        const selectedDeviceName = phoneSelectElement.value;
        const installmentsNum = installmentsNumElement.value;
<<<<<<< HEAD
        deviceInfo.monthlyPrice = Math.floor(parseInt(deviceInfo.normalPrice) / parseInt(installmentsNum));
        priceElements.monthlyPrice.textContent = `${deviceInfo.monthlyPrice.toLocaleString()} 円 / 月`;
=======
        deviceInfo.monthlyPrice = manager.getDeviceMonthlyPrice(selectedDeviceName,installmentsNum);
        monthlyPriceElement.textContent = deviceInfo.monthlyPrice.toLocaleString() + " 円";
>>>>>>> 57e532745aa129f1162ce31bfdb6fdc9b875aa74
    }

    onCheckboxChange(event, optionType) {
        const checkbox = event.target;
        const priceValue = this.getPriceValue(optionType);

        if (checkbox.checked) {
            totalPrice["phonePrice"] = priceValue;
            deviceInfo.checkPhonePrice = priceValue;

            if(optionType === "kaedoki"){
                detailsContentinfo.showTabContent("カエドキプログラム");
            }
        } else {
            if(optionType === "kaedoki"){
                detailsContentinfo.removeTabContent("カエドキプログラム");
            }
            totalPrice["phonePrice"] = 0;
            deviceInfo.checkPhonePrice = 0;
<<<<<<< HEAD
        }
        window.Total();
    }

    // オプションの価格を取得するメソッド
    getPriceValue(optionType) {
        switch (optionType) {
            case 'kaedoki':
                return deviceInfo.kaedokiMonthlyPrice;
            case 'price':
                return deviceInfo.monthlyPrice;
            default:
                return 0;
=======
            wince(selectedDeviceName, installmentsNum);dow.Total();
>>>>>>> 57e532745aa129f1162ce31bfdb6fdc9b875aa74
        }
    }

    // 合計金額をリセットするメソッド
    resetTotal() {
        let totalToAdd = 0;
        if (checkboxElements.kaedoki.checked) {
            totalToAdd += deviceInfo.kaedokiMonthlyPrice;
        }
        if (checkboxElements.price.checked) {
            totalToAdd += deviceInfo.monthlyPrice;
        }

        totalPrice.phonePrice = totalToAdd;
        deviceInfo.checkPhonePrice = totalToAdd;
        window.Total();
    }
}
