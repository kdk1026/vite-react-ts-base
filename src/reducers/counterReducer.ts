export const counterInitialScore = {
    count: 0
};

interface CounterState {
    count: number;
}

type CounterAction =
    | { type: 'INCREMENT' }
    | { type: 'DECREMENT' }
    | { type: 'RESET' }
    | { type: 'INCREMENT_BY_AMOUNT'; payload: number };

export const counterReducer = (state: CounterState, action: CounterAction) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1   
            };
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1   
            };
        case 'RESET':
            return counterInitialScore;
        case 'INCREMENT_BY_AMOUNT':
            return {
                ...state,
                count: state.count + action.payload   
            };
    
        default:
            return state;
    }
};