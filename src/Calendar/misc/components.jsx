import React, { useState } from "react";

/**
 * Provides a set of three radio buttons that allows the user to choose
 * how the 
 * @param {object} props
 * @param {Function} props.onChange
 * @returns {JSX.Element}
 */
export function ViewRadios(props) {
    // TODO: allow user to specify default view. Perhaps save value in localStorage?
    let { onChange } = props;
    return (
        <div>
            <label>
                Day
                <input type='radio' name="view" value="DAY" onChange={onChange}/>
            </label>

            <label>
                Week
                <input type='radio' name="view" value="WEEK" onChange={onChange} defaultChecked/>
            </label>

            <label>
                Month
                <input type='radio' name="view" value="MONTH" onChange={onChange}/>
            </label>
        </div>
    );
}

/**
 * Custom hook that can be used to force components to rerender.
 *
 * @returns {Function} Function that forces a rerender of the component it's called in.
 * @example
 *
 * // Using the useForceRerender hook to rerender a component when the window is resized.
 * const forceRerender = useForceRerender();
 * useEffect(() => {
 *     window.addEventListener('resize', forceRerender);
 *     return () => window.removeEventListener('resize', forceRerender);
 * },[]);
 *
 */
export const useForceRerender = () => {
    const [ _, setBool ] = useState(false);
    return () => setBool(prev => !prev);
}
