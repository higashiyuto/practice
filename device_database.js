// 端末データベースの定義
export class DeviceDatabase {
    constructor() {
        this.devices = {
            "iPhone16": {
                price: 145200,
                kaedokiPrice: 55440,
                warranty: 880
            },
            "iPhone15": {
                price: 119020,
                kaedokiPrice: 44044,
                warranty: 880
            },
            "iPhone14": {
                price: 107041,
                kaedokiPrice: 22033,
                warranty: 825
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
}
