import { Cookies } from "react-cookie";

const cookies = new Cookies();

export interface CookieOptions {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: boolean | 'lax' | 'strict' | 'none';
}

/**
 * 일반 쿠키 생성
 * @param {string} name 
 * @param {string} value 
 * @param {boolean} isLocal 
 * @param {CookieOptions} options 
 * @returns 
 */
export const setCookie = <T>(name: string, value: T, isLocal: boolean, options: CookieOptions) => {
    const shouldUseSecure = !isLocal;
    const updatedOptions = { 
        ...options, 
        ...(shouldUseSecure && { secure: true }) 
    };
    return cookies.set(name, value, updatedOptions);
};

/**
 * 쿠키 값 가져오기
 * @param {string} name 
 * @returns 
 */
export const getCookie = (name: string) => {
    // Array 혹은 OBject면 JSON.parse(name) 자동으로 해줌
    return cookies.get(name);
}

/**
 * 쿠키 삭제
 * @param {string} name 
 * @param {boolean} isLocal 
 * @param {CookieOptions} options 
 * @returns 
 */
export const removeCookie = (name: string, isLocal: boolean, options: CookieOptions) => {
    const shouldUseSecure = !isLocal;
    const updatedOptions = { 
        ...options, 
        ...(shouldUseSecure && { secure: true }) 
    };
    return cookies.remove(name, updatedOptions);
}

/**
 * Array 쿠키 생성
 * @param {string} name 
 * @param {Array} array 
 * @param {boolean} isLocal 
 * @param {CookieOptions} options 
 * @returns 
 */
export const setArrayInCookie = <T>(name: string, array: T[], isLocal: boolean, options: CookieOptions) => {
    if ( array && Array.isArray(array) && array.length > 0 ) {
        //JSON.stringify(array) 자동으로 해줌
        setCookie(name, array, isLocal, options);
    }
};

/**
 * Object 쿠키 생성
 * @param {string} name 
 * @param {Object} object 
 * @param {boolean} isLocal 
 * @param {CookieOptions} options 
 * @returns 
 */
export const setObjectInCookie = <T extends object>(name: string, object: T, isLocal: boolean, options: CookieOptions) => {
    if ( object && !Array.isArray(object) && Object.keys(object).length > 0 ) {
        //JSON.stringify(object) 자동으로 해줌
        setCookie(name, object, isLocal, options);
    }
}
