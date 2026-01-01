import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// 프로젝트 상화에 맞게 수정
interface ApiResponse<T> {
    data: {
        list?: T;
        data?: T;
        paging?: unknown;
    } & T;
    status?: number;
}

type ApiFunction<T, P extends unknown[]> = (...args: P) => Promise<ApiResponse<T>>;

/**
 * @example
 * const { apiData: a23CodeListData, callApi: fetchA23CodeList } = useApi(getCodeList, ['HMPG', 'HC037', lang], false);
 * const { apiData: a26CodeListData, callApi: fetchA26CodeList } = useApi(getCodeList, ['HMPG', 'HC038', lang], false);
 * const { apiData: userInfoData, callApi: fetchUserInfo } = useApi(getUserInfo, [], false);
 * const { apiData: usageWriteData, callApi: registUsageWriteApi } = useApi(registUsageWrite, [], false);
 * 
 * useEffect(() => {
 *  fetchA23CodeList();
 *  fetchA26CodeList();
 *  
 *  if ( isLogin ) {
 *      fetchUserInfo();
 *  }
 * }, []);
 * 
 * const handleSubmit = async (e) => {
 *  e.preventDefault();
 * 
 *  ...
 * 
 *  sendData(formData);
 * };
 * 
 * const sendData = async (formData) => {
 *  const res = await registUsageWriteApi([formData]);
 *  console.log(res);
 * };
 * ===============================================
 * const { apiData: notiListData, callApi: fetchNotiList, apiPaging } = useApi(getNotiList, [storeCd, lang, 'HC01601', pageIndex, notiCd, q], false);
 * 
 * useEffect(() => {
 *  fetchNotiList();
 * }, []);
 * 
 * useEffect(() => {
 *  fetchNotiList();
 * 
 *  if ( q ) {
 *      setSrchText(q);
 *  }
 * }, [fetchNotiList, pageIndex, notiCd, q]);
 * 
 * @param {*} apiFunction 
 * @param {*} initialParams
 * @param {undefined|null|blank|boolean} callOnInit
 * @returns 
 */
const useApi = <T, P extends unknown[]>(
    apiFunction: ApiFunction<T, P>, 
    initialParams: P, 
    callOnInit: boolean = true
) => {
    const navigate = useNavigate();

    const prevParamsRef = useRef('');

    const [apiData, setApiData] = useState<T | null>(null);
    const [apiPaging, setApiPaging] = useState<unknown>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const callApi = useCallback(async (...params: P) => {
        const currentParams = params.length > 0 ? params : initialParams;
        const paramsJson = JSON.stringify(currentParams);

        if ( !(currentParams[0] instanceof FormData) ) {
            if ( paramsJson === prevParamsRef.current ) return;
            prevParamsRef.current = paramsJson;
        }

        setIsLoading(true);

        try {
            const res = await apiFunction(...(currentParams));

            if ( res?.data ) {
                const { list, data, paging } = res.data;

                setApiData((list ?? data ?? res.data) as T);
                if (paging) setApiPaging(paging);
            }

            return res?.data;
        } catch (error: unknown) {
            if ( error && typeof error === 'object' && 'status' in error ) {
                if ( (error as { status: number }).status === 999 ) {
                    navigate("/error-network");
                }
            }
            
            console.error(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [initialParams, setIsLoading, apiFunction, navigate]);

    useEffect(() => {
        if ( callOnInit )  {
            const performInitialCall = async () => {
                await callApi(...initialParams);
            };
            performInitialCall();
        }
    }, [callOnInit, callApi, initialParams]);

    return {
        apiData, apiPaging, isLoading,
        callApi
    };
};

export default useApi;
