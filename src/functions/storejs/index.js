/*
 * @author scenicflighter
 * 
 * @description Store Function
 */

import store from 'store';

/* 
 * @param key String localStorageのキー require
 * @param setValue Any keyに保存する値、なければkeyを取得
 */
const storage = (key, setValue = undefined) => {
    return !setValue ? 
	store.get(key) : store.set(key, setValue);
}

export default storage;

