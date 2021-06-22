export type AccountIndex = {
    index: number;
};

export const toAccountIndex = (index: number = 1): AccountIndex => ({
    index,
});