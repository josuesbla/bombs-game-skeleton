import { BOMB_AVAILABLE_COLORS } from 'src/constants/common.constants';

let counterId = 1;
export const getId = (): string => String(counterId++);

export const generateRandomInteger = (min: number, max: number): number => {
    return Math.round(Math.random() * (max - min)) + min;
};

export const getAvailableBinColors = (): Array<string> => {
    return BOMB_AVAILABLE_COLORS.slice(0, 3);
};

export const convertNumbersToColors = (bincolors: Array<number>): Array<string> => {
    const availableColors = getAvailableBinColors();
    return bincolors.map((color: number) => availableColors[color]);
};

export const swapBinColors = (initialColors: Array<number>): Array<number> => {
    const temp = [ ...initialColors ];
    return initialColors.reduce((acc: Array<number>) => {
        const item = temp.splice(generateRandomInteger(0, temp.length - 1), 1)[0];
        return acc.concat(item);
    }, []);
};
