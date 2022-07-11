import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store';

// INFO: useTypedSelector хук сделан для вызова в компонентах типизорованного стора
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
