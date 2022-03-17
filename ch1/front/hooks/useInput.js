import {useState, useCallback} from 'react';


/**
 * 커스텀 훅!!!
 * @param initialValue
 * @returns {[unknown,((function(*): void)|*)]}
 */
export default (initialValue = null) => {
    const [value, setValue] = useState(initialValue);
    const handler = useCallback((e) => {
        setValue(e.target.value);
    }, [value]);

    return [value, handler, setValue];

}