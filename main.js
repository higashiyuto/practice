import { DeviceInfo } from "./device_info.js";
import { PlanInfo } from "./plan_info.js";
import { OptionInfo } from "./option_info.js";
import { DiscountInfo } from "./discount_info.js";

let total;
export let totalPrice = {
    phonePrice: 0,
    planPrice: 0,
    callOptionPrice: 0,
    warrantyOptionPrice: 0,
    mailOptionPrice: 0,
    securityOptionPrice: 0,
    familyDiscountPrice: 0,
    wifiDiscountPrice: 0,
    dCardDiscountPrice: 0,
};

const totalElement = document.querySelector(".total");

window.Total = function() {
    total = parseInt(totalPrice.phonePrice)+parseInt(totalPrice.planPrice)+parseInt(totalPrice.callOptionPrice)
            +parseInt(totalPrice.warrantyOptionPrice)+parseInt(totalPrice.mailOptionPrice)+parseInt(totalPrice.securityOptionPrice)
            -parseInt(totalPrice.familyDiscountPrice)-parseInt(totalPrice.wifiDiscountPrice)-parseInt(totalPrice.dCardDiscountPrice);
    totalElement.textContent = "合計 " + total + " 円";
};
new DeviceInfo();
new PlanInfo();
new OptionInfo();
new DiscountInfo();