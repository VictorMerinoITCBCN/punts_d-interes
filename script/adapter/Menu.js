import { DEFAULT_INTEREST_POINT_TYPES } from "../constants.js";
import { Selector } from "../components/Selector.js";
import { CsvLoader } from "../components/CsvLoader.js";
import { InterestPointFactory } from "../factory/InterestPointFactory.js";
import { InterestPointElement } from "../components/InterestPointElement.js";

const Order = {
    ASC: "Ascendent",
    DESC: "Descendent"
}

export class Menu {

    #menu;
    #input;
    #typeFilter;
    #orderFilter;
    #interestPointContainer;
    #$numOfInterestPoints;
    #clearFilterBtn;
    #isMenuOpen;
    
    constructor(id = "menu", aviableTypes = DEFAULT_INTEREST_POINT_TYPES) {
        this.#menu = document.getElementById(id);
        this.aviableTypes = aviableTypes;
        this.render();
        this.interestPoints = [];
        this.interestPointOnClick = null;
        this.onFileLoad = null;
        this.onClear = null;
        this.type = "All";
        this.order = Order.ASC;
        this.inputValue = "";
        this.#isMenuOpen = true; 
    }

    render() {
        this.renderHeader();
        this.renderInterestPointContainer();
        this.renderFooter();
    }

    toggleMenuOpen() {
        if (this.#isMenuOpen) this.#menu.classList.add("close");
        else this.#menu.classList.remove("close");
        this.#isMenuOpen = !this.#isMenuOpen;
    }

    renderHeader() {
        
        const $header = document.createElement("header");
        
        const $minimizeBtn = document.createElement("button");
        $minimizeBtn.innerHTML = `<span class="material-symbols-outlined">arrow_back_ios</span>`;
        $minimizeBtn.id = "minimize-btn";
        $minimizeBtn.addEventListener("click", () => this.toggleMenuOpen());
        this.#menu.appendChild($minimizeBtn);

        const typeFilterLabel = document.createElement("label");
        typeFilterLabel.textContent = "Tipus";
        $header.appendChild(typeFilterLabel);

        const orderFilterLabel = document.createElement("label");
        orderFilterLabel.textContent = "Ordre";
        $header.appendChild(orderFilterLabel);

        this.#typeFilter = Selector({options: DEFAULT_INTEREST_POINT_TYPES});
        this.#typeFilter.addEventListener("change", (e) => this.handleType(e));
        $header.appendChild(this.#typeFilter);

        const orderLabel = document.createElement("label");
        orderLabel.textContent = "Ordre";
        orderLabel.htmlFor = "orderFilter";


        this.#orderFilter = Selector({options: Object.values(Order)});
        this.#orderFilter.addEventListener("change", (e) => this.handleOrder(e));
        $header.appendChild(this.#orderFilter);

        this.#input = document.createElement("input");
        this.#input.placeholder = "Busca un sitio";
        this.#input.addEventListener("input", (e) => this.handleInput(e));
        $header.appendChild(this.#input);

        this.#menu.appendChild($header);
    }

    renderInterestPointContainer() {
        this.#interestPointContainer = document.createElement("main");
        this.#menu.appendChild(this.#interestPointContainer);
    }

    renderFooter() {
        const $footer = document.createElement("footer");

        this.#$numOfInterestPoints = document.createElement("span");
        $footer.appendChild(this.#$numOfInterestPoints);

        this.#clearFilterBtn = document.createElement("button");
        this.#clearFilterBtn.textContent = "Netejar tot";
        this.#clearFilterBtn.addEventListener("click", () => this.handleClear());
        $footer.appendChild(this.#clearFilterBtn);

        const $csvLoader = CsvLoader(file => this.handleFileUpload(file));
        $footer.appendChild($csvLoader);

        this.#menu.appendChild($footer);
    }

    setNumOfInterestPoints(num) {
       this.#$numOfInterestPoints.textContent = `Nùmero total: ${num}`; 
    }

    getFiltredInterestPoints() {
        let filtred = this.interestPoints;

        if (this.order === Order.ASC) filtred = this.interestPoints.toSorted();
        if (this.order === Order.DESC) filtred = this.interestPoints.toReversed();
        if (this.inputValue !== "") filtred = filtred.filter(point => point.name.toLowerCase().startsWith(this.inputValue));
        if (this.type !== "All") filtred = filtred.filter(point => point.type.toLowerCase() === this.type.toLowerCase());

        return filtred;
    }

    handleType(e) {
        this.type = e.target.value;
        this.renderInterestPoints(this.getFiltredInterestPoints());
    }

    handleOrder(e) {
        this.order = e.target.value;
        this.renderInterestPoints(this.getFiltredInterestPoints());
    }

    handleInput(e) {
        if (!this.interestPoints) return;

        this.inputValue = e.target.value.trim().toLowerCase();
        this.renderInterestPoints(this.getFiltredInterestPoints());
    }

    handleClear() {
        this.interestPoints = [];
        this.order = Order.ASC;
        this.type = "All";
        this.inputValue = "";
        this.#orderFilter.value = Order.ASC;
        this.#typeFilter.value = "All";
        this.#input.value = "";

        this.renderInterestPoints(this.interestPoints);
        this.onClear();
    }

    handleFileUpload(file) {
        if  (!this.onFileLoad) throw new Error("onFileLoad not set");
        
        this.interestPoints = this.getInterestPointsFromCsv(file); 
        this.renderInterestPoints(this.interestPoints);
        
        this.onFileLoad(this.interestPoints);
    }

    getInterestPointsFromCsv(file) {
        return file.rows.map(row => {
            const interestPoint = InterestPointFactory.fromCsvRow(row);
            if (!interestPoint) return null; 
            return interestPoint;
        }).filter(point => point != null);
    }

    renderInterestPoints(interestPoints) {
        this.#interestPointContainer.innerHTML = "";
        const fragment = document.createDocumentFragment();
        interestPoints.forEach(interestPoint => {
            const $element = InterestPointElement(interestPoint);
            if (!this.interestPointOnClick) throw new Error("onClick function not set");
            $element.addEventListener("click", () => this.interestPointOnClick(interestPoint));

            fragment.appendChild($element);
        });
        this.setNumOfInterestPoints(interestPoints.length);
        this.#interestPointContainer.appendChild(fragment);
    }
}