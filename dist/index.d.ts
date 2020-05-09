declare class Refresher {
    private _secret;
    constructor(secret: string);
    private getKey;
    encrypt(state: object): string;
    decrypt(value: string): any;
}
/**
 * @Method: Initialize Redux-Refresh
 * @Param {string}
 * @Return {Refresher}
 */
export declare function initRefresh(secret: string): Refresher;
export {};
