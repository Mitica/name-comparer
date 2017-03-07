
import * as isAbbrOf from 'is-abbr-of';
import * as atonic from 'atonic';

export type OptionsType = {
    transforms?: string[]
};

export const INSENSITIVE = 'INS';
export const ABBREVIATION = 'ABBR';
export const ATONIC = 'ATONIC';
export const INSENSITIVE_ATONIC = 'INS_ATONIC';

const OPTIONS = {
    transforms: [INSENSITIVE, ABBREVIATION]
};

/**
 * Compare two names. Retuns true if are equal or passes all compare rules.
 * @param name1 Name 1
 * @param name2 Name 2
 * @param options Compare options
 */
export function compare(name1: string, name2: string, options?: OptionsType): boolean {
    name1 = normalize(name1);
    name2 = normalize(name2);

    if (name1 === name2) {
        return true;
    }

    options = options || {};
    const transforms = options.transforms || OPTIONS.transforms;

    for (var i = 0; i < transforms.length; i++) {
        switch (transforms[i]) {
            case INSENSITIVE:
                if (compareInsensitive(name1, name2)) {
                    return true;
                }
                break;
            case ABBREVIATION:
                if (compareAbbreviation(name1, name2) || compareAbbreviation(name2, name1)) {
                    return true;
                }
                break;
            case ATONIC:
                if (compareAtonic(name1, name2)) {
                    return true;
                }
                break;
            case INSENSITIVE_ATONIC:
                if (compareInsensitiveAtonic(name1, name2)) {
                    return true;
                }
                break;
            default: throw new Error('invalid transform: ' + transforms[i]);
        }
    }

    return false;
}

export function compareInsensitiveAtonic(name1: string, name2: string) {
    name1 = atonic.lowerCase(name1.toLowerCase());
    name2 = atonic.lowerCase(name2.toLowerCase());

    return name1 === name2;
}

export function compareAtonic(name1: string, name2: string) {
    name1 = atonic(name1);
    name2 = atonic(name2);

    return name1 === name2;
}

export function compareAbbreviation(abbr: string, name: string) {
    if (abbr.indexOf(' ') > 0) {
        if (isAbbrOf(nameToAbbr(abbr), name)) {
            return true;
        }
    }
    return isAbbrOf(abbr, name);
}

export function compareInsensitive(name1: string, name2: string) {
    return name1.toLowerCase() === name2.toLowerCase();
}

function nameToAbbr(name: string): string {
    const words = name.split(/[\s\.]+/g);
    return words.map(word => word[0].toUpperCase()).join('');
}

/**
 * Normalize a string
 * @param s A string to be normalized
 */
function normalize(s: string): string {
    return s.replace(/[\s\u00A0]+/, ' ').trim();
}
