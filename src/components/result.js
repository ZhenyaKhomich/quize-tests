import {UrlManager} from "../utils/url-manager.js";

export class Result {

    constructor() {
        this.routeParams = UrlManager.getQueryParams();

        const that = this;
        const url = new URL(location.href);
        document.getElementById('result-score').innerHTML = this.routeParams.score + '/' + this.routeParams.total;
    }
}
