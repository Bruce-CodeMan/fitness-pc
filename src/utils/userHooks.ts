import { connectFactory, useAppContext } from "./contextFactory";

const KEY = 'userInfo'
const DEFAULT_VALUE = {}

export const useUserContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

