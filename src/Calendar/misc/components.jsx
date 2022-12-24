import React, { useContext, useState } from "react";
import { DateContext, Views } from "../Calendar";

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

export function DateToggles(props) {
    const view = Object.keys(Views).find((property) => Views[property] === props.view);
    console.assert(view === 'DAY' || view === 'WEEK' || view === 'MONTH' || view === 'YEAR');

    const [ date, setDate ] = useContext(DateContext);

    /**
     * This function is called when either the <- or -> `<button>` is clicked, and updates
     * the date value stored in {@link DateContext}.
     * @param {MouseEvent} event - `click` event.
     * @returns {void} void
     */
    const handleClick = (event) => {
        // Couldn't think of a better variable name
        const direction = event.currentTarget.value;

        if (direction === 'today') {
            setDate(new Date());
            return;
        }

        let factor = direction === 'increment' ? 1 : -1;

        switch (view) {
            case 'DAY': {
                setDate(prev => {
                    const copy = new Date(prev);
                    copy.setDate( copy.getDate() + factor );
                    return copy;
                });
                break;
            }
            case 'WEEK': {
                setDate(prev => {
                    const copy = new Date(prev);
                    copy.setDate(copy.getDate() + 7*factor);
                    return copy;
                });
                break;
            }
            case 'MONTH': {
                setDate(prev => {
                    const copy = new Date(prev);
                    copy.setMonth( copy.getMonth() + factor );
                    return copy;
                });
                break;
            }
            case 'YEAR': {
                setDate(prev => {
                    const copy = new Date(prev);
                    copy.setFullYear( copy.getFullYear() + factor );
                    return copy;
                });
                break;
            }
            default: {
                console.warn('what', view);
                break;
            }
        }
    };

    return (
        <div className='date-toggles'>
            <button onClick={handleClick} value='decrement'>{'<-'}</button>
            <button onClick={handleClick} value='today'>Today</button>
            <button onClick={handleClick} value='increment'>{'->'}</button>
        </div>
    );
}
