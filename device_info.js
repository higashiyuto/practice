import { DeviceInfoManager } from './device_manager.js';
import { DeviceDatabase } from './device_database.js';
import { DetailsContentInfo } from './details_info.js';
import { warranty_option_select } from './option_info.js';
import { OptionInfo } from './option_info.js';

import { totalPrice } from './main.js';

// 端末データベースとデータ管理クラスのインスタンス化
const db = new DeviceDatabase(); // 端末データベースのインスタンス
const manager = new DeviceInfoManager(db);

const detailsContentinfo = new DetailsContentInfo();
const optionInfo = new OptionInfo();

/*セレクトボタンの要素*/
const phoneSelectElement = document.getElementById('phone-select');
const installmentsNumElement = document.getElementById('installments-num');

/*プライスの要素*/
const phonePriceElement = document.querySelector('.phone-price');
const kaedokiPriceElement = document.querySelector('.kaedoki-price');
const kaedokiMonthlyPriceElement = document.querySelector('.kaedoki-monthly-price');
const normalPriceElement = document.querySelector('.normal-price');
const monthlyPriceElement = document.querySelector('.monthly-price');

/*チェックボックスの要素*/
const kaedokiCheckboxElement = document.querySelector('.kaedoki-price-checkbox');
const priceCheckboxElement = document.querySelector('.price-checkbox');

export let deviceInfo = {
    phonePrice: 0,
    kaedokiPrice: 0,
    kaedokiMonthlyPrice: 0,
    normalPrice: 0,
    monthlyPrice: 0,
    checkPhonePrice: 0
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

        kaedokiCheckboxElement.addEventListener('change', (event) => {
            this.onCheckboxChange(event,deviceInfo.kaedokiMonthlyPrice);
            if(event.target.checked){
                detailsContentinfo.showTabContent("カエドキプログラム");
            }else{
                detailsContentinfo.removeTabContent("カエドキプログラム");
            }
        });
        priceCheckboxElement.addEventListener('change', (event) => {
            this.onCheckboxChange(event,deviceInfo.monthlyPrice);
        });
    }

    // 端末を選択した際に価格を更新するメソッド
    updatePrices() {
        const selectedDeviceName = phoneSelectElement.value;
        warranty_option_select["smartあんしん補償"] =  db.getDeviceWarranty(selectedDeviceName);
        deviceInfo.phonePrice = manager.getDevicePrice(selectedDeviceName);
        deviceInfo.kaedokiPrice = manager.getDeviceKaedokiPrice(selectedDeviceName);
        deviceInfo.kaedokiMonthlyPrice = manager.getDeviceKaedokiPrice(selectedDeviceName)/23;
        deviceInfo.normalPrice = manager.getDevicePrice(selectedDeviceName);
        
        phonePriceElement.textContent = deviceInfo.phonePrice.toLocaleString();
        kaedokiPriceElement.textContent = deviceInfo.kaedokiPrice.toLocaleString() + " 円 =";
        kaedokiMonthlyPriceElement.textContent = Math.floor(deviceInfo.kaedokiMonthlyPrice).toLocaleString() + " 円";
        normalPriceElement.textContent = deviceInfo.normalPrice.toLocaleString() + " 円 =";

        optionInfo.setupEventListeners();
        this.updateMonthlyPrice();
        this.resetTotal();
    }

    // 分割払い回数を変更した際に月額価格を更新するメソッド
    updateMonthlyPrice() {
        const selectedDeviceName = phoneSelectElement.value;
        const installmentsNum = installmentsNumElement.value;
        deviceInfo.monthlyPrice = manager.getDeviceMonthlyPrice(selectedDeviceName, installmentsNum);
        monthlyPriceElement.textContent = deviceInfo.monthlyPrice.toLocaleString() + " 円";
    }

    onCheckboxChange(event,price) {
        const checkbox = event.target;
        const priceValue = parseFloat(price);

        if (checkbox.checked) {
            totalPrice.phonePrice = priceValue;
            deviceInfo.checkPhonePrice = priceValue;
            window.Total();
        } else {
            totalPrice.phonePrice = 0;
            deviceInfo.checkPhonePrice = 0;
            window.Total();
        }
    }

    resetTotal(){
        let totalToAdd = 0;
        if (kaedokiCheckboxElement.checked) {
            totalToAdd += deviceInfo.kaedokiMonthlyPrice;
        }
        if (priceCheckboxElement.checked) {
            totalToAdd += deviceInfo.monthlyPrice;
        }

        totalPrice.phonePrice = -deviceInfo.checkPhonePrice;
        totalPrice.phonePrice = totalToAdd;
        deviceInfo.checkPhonePrice = totalToAdd;
        window.Total();
    }
}
