/*
 * @author scenicflighter
 * @description Backlog Js Client
 */

import * as backlogjs from 'backlog-js';

import storage from '../storejs';

const HOST_KEY = "backlog_host";
const APIKEY_KEY = "backlog_api_key";

const _getCredentials = () => {
    return {
    	host: storage(HOST_KEY),
	apiKey: storage(APIKEY_KEY)
    };
}

const _getClient = () => {
    return new backlogjs.Backlog(_getCredentials());
}

const backlog = {
    /* Async Space詳細取得 */
    getSpace: async () => {
	return await _getClient().getSpace();
    },
    /* Async Spaceのアイコンを取得 */
    getSpaceIcon: async () => {
	const Blob = await _getClient().getSpaceIcon();

	return URL.createObjectURL(await Blob.blob());
    },
    /* Async Projectの取得 */
    getProjects: async () => {
        return await _getClient().getProjects()
    },
    /* Async Wikiの取得 @param projectIdOrKey Number */
    getWiki: async (projectIdOrKey) => {
    	return await _getClient().getWikis(projectIdOrKey);
    }
}

export default backlog;

