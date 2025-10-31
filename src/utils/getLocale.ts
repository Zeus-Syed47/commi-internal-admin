import enLocale from '../locale/en.json';

export const getLocaleString = (key: string) => {
    return enLocale[key]
}