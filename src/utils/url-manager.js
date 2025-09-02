export class UrlManager {

    static getQueryParams() {
        const qs = document.location.hash.split('+').join(' ');

        let params = {},
            tokens,
            re = /[&?]([^=]+)=([^&]*)/g;

        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    }

    static checkUserData(params) {
        if (!params.name || !params.lastName || !params.email) {
            location.href = '../../../../9 МОДУЛЬ Продвинутый фронтенд/9.18. Проект Quiz часть 3 (routs, webpack)/Проект Quiz part3, работа с routes, webpack/templates/index.html';
        }
    }
}