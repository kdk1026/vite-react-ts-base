import { Cookies } from "react-cookie";

const DEFAULT_OPTIONS = {
    path: "/",
    secure: import.meta.env.VITE_PROFILE !== "local",
};

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
 * @param {CookieOptions} options 
 * @returns 
 */
export const setCookie = <T>(name: string, value: T, options: CookieOptions) => {
    return cookies.set(name, value, { ...DEFAULT_OPTIONS, ...options });
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
 * @param {CookieOptions} options 
 * @returns 
 */
export const removeCookie = (name: string, options: CookieOptions) => {
    return cookies.remove(name, { ...DEFAULT_OPTIONS, ...options });
}

/**
 * Array 쿠키 생성
 * @param {string} name 
 * @param {Array} array 
 * @param {CookieOptions} options 
 * @returns 
 */
export const setArrayInCookie = <T>(name: string, array: T[], options: CookieOptions) => {
    if ( array && Array.isArray(array) && array.length > 0 ) {
        //JSON.stringify(array) 자동으로 해줌
        setCookie(name, array, options);
    }
};

/**
 * Object 쿠키 생성
 * @param {string} name 
 * @param {Object} object 
 * @param {CookieOptions} options 
 * @returns 
 */
export const setObjectInCookie = <T extends object>(name: string, object: T, options: CookieOptions) => {
    if ( object && !Array.isArray(object) && Object.keys(object).length > 0 ) {
        //JSON.stringify(object) 자동으로 해줌
        setCookie(name, object, options);
    }
}
