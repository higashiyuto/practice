// 端末データベースの定義
export class DeviceDatabase {
    constructor() {
        this.devices = {
            "iPhone16 128GB": {
<<<<<<< HEAD
                    price: 145200,
                    kaedokiPrice: 55440,
                    warranty: 880,
                    discount: {
                        upgrade: 5500,
                        mnp: 39798,
                        newContract: 5500
                    }
                },
=======
                price: 145200,
                kaedokiPrice: 55440,
                warranty: 880,
                discount: {
                    upgrade: 5500,
                    mnp: 39798,
                    newContract: 5500
                }
            },
>>>>>>> 57e532745aa129f1162ce31bfdb6fdc9b875aa74
            "iPhone15 128GB": {
                price: 119020,
                kaedokiPrice: 44044,
                warranty: 880,
                discount: {
                    upgrade: 22033,
                    mnp: 39127,
                    newContract: 22033
                }
            },
            "iPhone14 128GB": {
                price: 107041,
                kaedokiPrice: 22033,
                warranty: 825,
                discount: {
                    upgrade: 0,
                    mnp: 22010,
                    newContract: 22010
                }
            },
            "iPhone16 256GB": {
                price: 172810,
                kaedokiPrice: 65890,
                warranty: 880,
                discount: {
                    upgrade: 0,
                    mnp: 5500,
                    newContract: 5500
                }
            },
            "iPhone16 Pro 128GB": {
                price: 192830,
                kaedokiPrice: 77990,
                warranty: 1100,
                discount: {
                    upgrade: 11000,
                    mnp: 5500,
                    newContract: 5500
                }
            },
            "iPhone16 Pro 256GB": {
                price: 218790,
                kaedokiPrice: 90750,
                warranty: 1100,
                discount: {
                    upgrade: 0,
                    mnp: 5500,
                    newContract: 0
                }
            },
            "Google Pixel8a": {
                price: 84480,
                kaedokiPrice: 28864,
                warranty: 770,
                discount: {
                    upgrade: 11000,
                    mnp: 27929,
                    newContract: 0
                }
            },
            "Google Pixel9": {
                price: 148060,
                kaedokiPrice: 51260,
                warranty: 880,
                discount: {
                    upgrade: 11000,
                    mnp: 11000,
                    newContract: 0
                }
            },
            "Galaxy S24": {
                price: 131560,
                kaedokiPrice: 51920,
                warranty: 880,
                discount: {
                    upgrade: 11000,
                    mnp: 22022,
                    newContract: 0
                }
            },
            "Galaxy A55": {
                price: 70840,
                kaedokiPrice: 27632,
                warranty: 770,
                discount: {
                    upgrade: 11000,
                    mnp: 28710,
                    newContract: 0
                }
            },
            "Xperia 10VI": {
                price: 74140,
                kaedokiPrice: 49060,
                warranty: 770,
                discount: {
                    upgrade: 0,
                    mnp: 33000,
                    newContract: 0
                }
            },
            "AQUOS wish4": {
                price: 22000,
                kaedokiPrice: 0,
                warranty: 330,
                discount: {
                    upgrade: 11000,
                    mnp: 21999,
                    newContract: 21999
                }
            },
            "AQUOS sense9": {
                price: 67100,
                kaedokiPrice: 43340,
                warranty: 550,
                discount: {
                    upgrade: 0,
                    mnp: 0,
                    newContract: 0
                }
            },
            "arrows We2":{
                price: 22000,
                kaedokiPrice: 0,
                warranty: 330,
                discount: {
                    upgrade: 11000,
                    mnp: 21999,
                    newContract: 21999
                }
            }
        };
    }

    // 端末名を取得するメソッド
    getDeviceNames() {
        return Object.keys(this.devices);
    }

    // 端末の価格を取得するメソッド
    getDevicePrice(deviceName) {
        return this.devices[deviceName].price;
    }

    // 端末の「一括」価格を取得するメソッド
    getDeviceKaedokiPrice(deviceName) {
        return this.devices[deviceName].kaedokiPrice;
    }

    getDeviceWarranty(deviceName) {
        return this.devices[deviceName].warranty;
    }

    getDiscount(deviceName,type){
        const device = this.devices[deviceName];

        if(device && device.discount){
            if(type === "機種変更"){
                return device.discount.upgrade;
            }else if(type === "新規"){
                return device.discount.newContract;
            }else if(type === "MNP"){
                return device.discount.mnp;
            }
        }
        return 0;
    }
}
