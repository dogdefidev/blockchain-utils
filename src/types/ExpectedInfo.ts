import {expect} from "chai";

export type ExpectedInfo = {
    mustFail: boolean;
    expectedError: string | undefined;
    assertError: (error: any, printError?: boolean) => void;
    assertSuccess: (result: any) => void;
    assertMustntFail: () => void;
};


export const toTitle = (fnName: string, expectedResult?: ExpectedInfo) => {
    return `${fnName} ${
        expectedResult?.mustFail ? `(MustFail ${expectedResult.expectedError})` : ""
    }`;
};

export const toExpect = (expectedError?: string): ExpectedInfo => {
    const mustFail = expectedError !== undefined;
    return {
        mustFail,
        expectedError,
        assertMustntFail: () => {
            expect(mustFail, "It should have failed.").to.be.false;
        },
        assertError: (error: any, printError: boolean = false) => {
            if (printError) {
                console.log(error);
            }
            expect(mustFail, "It should have failed.").to.be.true;
            expect(error, "Error should be defined.").to.not.be.undefined;
            expect(
                error.reason || error.message,
                "The reason or error message should include the expected error message."
            ).includes(expectedError);
        },
        assertSuccess: (result: any) => {
            expect(mustFail, "It should not have failed.").to.be.false;
            expect(result, "Result must be defined.").to.not.be.undefined;
        },
    };
};