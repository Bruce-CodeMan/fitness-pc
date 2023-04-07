/*
 * @Date: 2023-04-07 16:23:49
 * @Author: Bruce
 * @Description: 
 */
import React, { createContext, useContext, useMemo, useState } from "react";

interface IStore {
    key: string;
    store: Record<string, any>;
    setStore: (payload: Record<string, any>) => void;
}

interface IProp {
    children: React.ReactNode;
}

const getCtxProvider = (
    key: string, 
    defaultValue: Record<string, any>,
    AppContext: React.Context<IStore>
) => ({ children }: IProp) => {

    const [store, setStore] = useState(defaultValue);

    const value = useMemo(() => ({
        key, store, setStore 
    }), [store]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

const ctxCache: Record<string, Ctx> = {};

class Ctx {

    defaultStore: IStore;
    AppContext: React.Context<IStore>;
    Provider: ({ children }: IProp) => JSX.Element;

    constructor(key: string, defaultValue: Record<string, any>){
        this.defaultStore = {
            key,
            store: defaultValue,
            setStore: () => {},
        };

        this.AppContext = createContext(this.defaultStore);

        this.Provider = getCtxProvider(key, defaultValue, this.AppContext);

        ctxCache[key] = this;
    }
}

// Context的生成器
export const useAppContext = (key: string) => {
    const ctx = ctxCache[key];
    const app = useContext(ctx.AppContext);
    return {
        store: app.store,
        setStore: app.setStore,
    }
}

export const connectFactory = (
    key: string,
    defaultValue: Record<string, any>
) => {
    const ctx = ctxCache[key];
    let CurCtx: Ctx;
    if(ctx) {
        CurCtx = ctx;
    }else{
        CurCtx = new Ctx(key, defaultValue);
    }

    return (Child: React.FunctionComponent<any>) => (props: any) => {
        <CurCtx.Provider>
            <Child {...props} />
        </CurCtx.Provider>
    }
}