
export type Token = {
    name: string;
    symbol: string;
    decimals: number;
};

export const toToken = (
    name: string,
    symbol: string,
    decimals: number
): Token => ({ name, symbol, decimals });
