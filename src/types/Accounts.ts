/* eslint-disable import/prefer-default-export */

export class Accounts {
    private pks: Array<string> = new Array<string>();

    constructor(
        object: any = process.env,
        getKey: (index: number) => string = (index) => `ACCOUNT_${index}_PK`
    ) {
        let index = 0;
        while (object[getKey(index)] !== undefined) {
            this.pks.push(object[getKey(index)]);
            index += 1;
        }
    }

    getPKs(): Array<string> {
        return this.pks;
    }
}
