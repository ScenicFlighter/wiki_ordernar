/*
 * @description
 *   Util関数
 */

const Utils = {
    /*
     * @param objArr parse対象オブジェクト配列
     * @param Delimiter 分割文字列
     * @param key 対象key
     */
    parseObjectArrWithString: (objArr, Delimiter = "/") => {
	const compacts = objArr.map(obj => {return {id: obj.id, name: obj.name}; });
	const treeData = [];
	
	compacts.forEach(compact => {
	    const splited = (compact.name).split(Delimiter);

	    if (!treeData[splited[0]]) treeData[splited[0]] = [];

	    const arrKey = splited[0];

	    splited.splice(0, 1);

	    treeData[arrKey].push(splited);
	});

	console.log(treeData);

	const results = [];

	Object.keys(treeData).forEach((key) => {
	    const parent = {title: key};
	    const trees = treeData[key];

	    trees.forEach(tree => {
		
	    });

	    results.push(parent);
	});
	console.log(results);
    }
}

export default Utils;

