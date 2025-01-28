const details_contents = [
    {
        "kaedoki-price-checkbox": {
            tabName: "カエドキプログラム",
            content: "ドコモが提供する分割プランの一つ"
        }
    },
    {
        "irumo-checkbox": {
            tabName: "irumo",
            content: "ドコモの格安プラン"
        }
    }
]

export class DetailsDatabase {
    constructor() {
    }

    getKeyByTabName(tabName){
        const foundItem = details_contents.find(item => {
            const key = Object.keys(item)[0];
            return item[key].tabName === tabName;
        });

        return foundItem ? Object.keys(foundItem)[0] : null;
    }

    getContentByTabName(tabName){
        const foundItem = details_contents.find(item => {
            const key = Object.keys(item)[0];
            return item[key].tabName === tabName;
        });

        return foundItem ? Object.values(foundItem)[0].content : null;
    }
}
