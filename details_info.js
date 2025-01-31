import { DetailsDatabase } from "./details_database.js";

export class DetailsContentInfo{
    constructor(){
        this.detailsDatabase = new DetailsDatabase();
        this.tabElement = document.querySelector(".tab-container");
        this.contentElement = document.querySelector(".content-container");

        this.tabElement.addEventListener("click", (event) => {
            const clickedTab = event.target.closest(".tab");
            const clickedContent = event.target.closest(".tab-content");
            if(clickedTab){
                this.activateTab(clickedTab,clickedContent);
            }
        });
    }

    showTabContent(checkboxText){
        const tabContentElement = document.createElement("div");
        const contentsContentElement = document.createElement("div");
        const existingTab = document.querySelector(`.tab-${checkboxText}`);
        if (existingTab) {
            // タブが既に存在する場合は何もしない
            return;
        }
        if(!this.tabElement.querySelector(".tab")){
            this.createTabElement(tabContentElement,contentsContentElement,checkboxText);
            tabContentElement.classList.add("active");
            contentsContentElement.classList.add("active");
        }else{
            this.createTabElement(tabContentElement,contentsContentElement,checkboxText);
        }
    }

    createTabElement(tab,contents,checkbox){
        tab.classList.add("tab");
        tab.setAttribute("data-target",this.detailsDatabase.getKeyByTabName(checkbox));
        tab.textContent = checkbox;
        this.tabElement.appendChild(tab);

        contents.classList.add("tab-content");
        contents.setAttribute("id",this.detailsDatabase.getKeyByTabName(checkbox));
        contents.textContent = this.detailsDatabase.getContentByTabName(checkbox);
        this.contentElement.appendChild(contents);
    }

    removeTabContent(checkboxText){
        const key = this.detailsDatabase.getKeyByTabName(checkboxText);

        const tabItem = this.tabElement.querySelector(`.tab[data-target="${key}"]`);
        if(tabItem){
            tabItem.remove();
        }

        const contentItem = this.contentElement.querySelector(`#${key}`);
        if(contentItem){
            contentItem.remove();
        }
    }

    activateTab(clickedTab,clickedContent){
        this.tabElement.querySelectorAll(".tab").forEach((tab)=>tab.classList.remove("active"));
        clickedTab.classList.add("active");

        this.contentElement.querySelectorAll(".tab-content").forEach((tab)=>tab.classList.remove("active"));
        document.getElementById(clickedTab.getAttribute('data-target')).classList.add("active");
    }
}