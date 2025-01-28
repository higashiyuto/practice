// 端末データの管理を行うクラス
export class DeviceInfoManager {
    constructor(deviceDatabase) {
        this.deviceDatabase = deviceDatabase;
    }

    // 端末名を取得するメソッド
    getDeviceNames() {
        return this.deviceDatabase.getDeviceNames();
    }

    // 端末価格を取得するメソッド
    getDevicePrice(deviceName) {
        return this.deviceDatabase.getDevicePrice(deviceName);
    }

    // 端末の「一括」価格を取得するメソッド
    getDeviceKaedokiPrice(deviceName) {
        return this.deviceDatabase.getDeviceKaedokiPrice(deviceName);
    }

    // 端末の月額価格を計算するメソッド
    getDeviceMonthlyPrice(deviceName, installments) {
        const price = this.getDevicePrice(deviceName);
        return Math.floor(price / installments);
    }
}
