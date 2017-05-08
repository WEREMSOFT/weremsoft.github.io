const OUTPUT_FOLDER = '../blog';
const TEMPLATES_DIR = 'modules';
const CONTENT_DIR = 'contents';
const MAIN_TEMPLATE = '{{>header}}{{>mainbody}}{{>footer}}';
const POST_TEMPLATE = '{{>header}}{{>postBody}}{{>footer}}';
const fs = require('fs');
var ncp = require('ncp').ncp;
var rimraf = require('rimraf');



/**
 * Gets the JSON files to replace into de templates.
 * @returns {*}
 */
function getContentReplacementDictionary(){
	var contentList = getFolderContentAsArray(CONTENT_DIR);
	var replacementDictionary = buildModuleIjectionString(contentList, CONTENT_DIR);
	return replacementDictionary;
}
/**
 * Generates the HTML files BEFORE being injected with data.
 * @param contentDictionary
 */
function generateHTMLFiles(contentDictionary){
	var stringToHandle = '';
    var options = { flag : 'w' };
    for(var key in contentDictionary){
        stringToHandle = key.indexOf('post') == -1?MAIN_TEMPLATE:POST_TEMPLATE;
        fs.writeFileSync('./partials/' + key + '.html', stringToHandle, options);
    }

}
/**
 * Builds the dictionary that willl be used for replace the template injection. Before inject the data.
 * This is used to reutilize HTML code as header and footer
 * @returns {*}
 */
function getModulesReplacementDictionary(){
	var modulesList = getFolderContentAsArray(TEMPLATES_DIR);
	var replacementDictionary = buildModuleIjectionString(modulesList, TEMPLATES_DIR);
	return replacementDictionary;
}
/**
 * gets the folder contents as an array. This array will be used to iterate all the files in the directory.
 * This function is used very often in the compilation.
 * @param folder
 * @returns {Array}
 */
function getFolderContentAsArray(folder){
	var modulesSource = [];

	let files = fs.readdirSync(folder);
	files.forEach(file => {
		console.log('Adding ' + file + '...');
		modulesSource.push(file);
	});
	console.log('done adding files');
	return modulesSource;
}

/**
 * generates a dictionary, that will be used to inject data into the templates. This function is called after all the
 * template rendering and inclusion is donde.
 * @param fileNamesArray
 * @param dir
 * @returns {Array}
 */
function buildModuleIjectionString(fileNamesArray, dir){
	console.log('Adding file contents to array...');
	var replacementDictionary = [];
	fileNamesArray.forEach(fileName => {
		var fileType = fileName.split('.')[1];
        var fileToRead = './'+ dir + '/' + fileName;
        var contents = '';
		switch(fileType){
			case 'html':
                contents = fs.readFileSync(fileToRead, 'utf8');
				break;
            case 'json':
                contents = require(fileToRead);
                break;
        }


			replacementDictionary[fileName.split('.')[0]] = contents;
	});
	return replacementDictionary;
}

function replaceModulesInFiles(replacementDictionary, tagStart, tagEnd, inputDir, outputDir){
	var templatesFileList = getFolderContentAsArray(inputDir);
	templatesFileList.forEach(file => {
		if(file.split('.')[1] == 'html'){
			var stringToHandle = fs.readFileSync(inputDir + file, 'utf8');
			for(var key in replacementDictionary){
				let stringToReplace = replacementDictionary[key];
				stringToHandle = replace(stringToHandle, tagStart + key + tagEnd, stringToReplace);
			}
			var options = { flag : 'w' };
    		fs.writeFileSync(outputDir + file, stringToHandle, options);
		}
	});
};

/**
 * This function replaces all the data macros(denoted with {{>>) with the data.
 * @param replacementDictionary
 * @param tagStart
 * @param tagEnd
 * @param inputDir
 * @param outputDir
 */
function replaceContentInFiles(replacementDictionary, tagStart, tagEnd, inputDir, outputDir){
    var templatesFileList = getFolderContentAsArray(inputDir);
    templatesFileList.forEach(file => {
        if(file.split('.')[1] == 'html'){
            var stringToHandle = fs.readFileSync(inputDir + file, 'utf8');
            var wordsList = replacementDictionary[file.split('.')[0]];
            stringToHandle = injectContentInString(stringToHandle, wordsList, tagStart, tagEnd);
            // for(var key in wordsList){
            // 	let stringToReplace = wordsList[key];
            //     stringToHandle = replace(stringToHandle, tagStart + key + tagEnd, stringToReplace);
            // }
            var options = { flag : 'w' };
            fs.writeFileSync(outputDir + file, stringToHandle, options);
        }
    });
}

function injectContentInString(stringToInject, dataToBeInjected, tagStart, tagEnd){
	if(tagStart == null) tagStart = '{{>';
	if(tagEnd == null) tagEnd = '}}';

    for(var key in dataToBeInjected){
        let stringToReplace = dataToBeInjected[key];
        stringToInject = replace(stringToInject, tagStart + key + tagEnd, stringToReplace);
    }
	return stringToInject;
}
/**
 * Replaces stringToSearch with stringToReplace in stringSource and returns the modified string;
 * @param stringSource
 * @param stringToSearch
 * @param stringToReplace
 * @returns {string}
 */
function replace(stringSource, stringToSearch, stringToReplace){
    stringSource = stringSource.split(stringToSearch).join(stringToReplace);
	return stringSource;
}

/**
 * This function just copy files and folders from one folder to another.
 * @param source
 * @param destination
 */
function copyAssets(source, destination){
	ncp.limit = 16;
	ncp(source, destination, function (err) {
	 if (err) {
	   return console.error(err);
	 }
	 console.log('done copy!');
	});
}
/**
 * Iterates all posts and add it to the index.html
 * @param contentDictionary
 * @param replacementDictionary
 * @param file
 * @param outputDir
 */
function addPosts(contentDictionary, postListTemplate){
	var indexFilecontent = getIndexFileContent();
	var postArray = getPostsArray(contentDictionary);
	var stringToInjectInIndex = getStringToInjectOnIndex(postArray, postListTemplate);
    indexFilecontent = replace(indexFilecontent, '{{>>>iterate:posts:postMainPage.html}}', stringToInjectInIndex);
	saveOnIndexFile(indexFilecontent);
}

function getPostsArray(contentDictionary){
	var returnValue = [];
	var postIndex = 1;
	while(contentDictionary['post' + postIndex]) {
		returnValue.push(contentDictionary['post' + postIndex]);
		postIndex++;
	}
	return returnValue;
}

function saveOnIndexFile(indexContent){
    var options = { flag : 'w' };
    fs.writeFileSync('./partials/index.html', indexContent, options);
}

function getStringToInjectOnIndex(postArray, postListTemplate){
	var returnValue = '';
	var i = postArray.length;
	while(--i >= 0){
        var partial = injectContentInString(postListTemplate, postArray[i], '{{>>', '}}');
        partial = replace(partial, '{{>>#href}}', 'post' + (i + 1) + '.html');
        returnValue += injectContentInString(partial, postArray[i], '{{>>', '}}');
    }
	return returnValue;
}

function getPostListTemplate(){
	var returnValue = '';
	console.log('get Post list template');
	return returnValue;
}

function getIndexFileContent(){
	console.log('getting index file content');
	var returnValue = '';
	returnValue = fs.readFileSync('./partials/index.html', 'utf8');
	return returnValue;
}

console.log('deleting output folder');
try{
    rimraf.sync('../blog');
    console.log('output folder deleted');
}catch(e){
	console.log('output folder does not exists');
}


console.log('creating output folders');
fs.mkdirSync('../blog');
console.log('output folders created');
console.log('creating temp folders');
try{
    fs.mkdirSync('./partials');
    console.log('temp folders created');
}catch(e){
	console.log('partials already exists');
}

var contentDictionary = getContentReplacementDictionary();
generateHTMLFiles(contentDictionary);
var replacementDictionary = getModulesReplacementDictionary();

replaceModulesInFiles(replacementDictionary, '{{>', '}}', './partials/', './partials/');
replaceContentInFiles(contentDictionary, '{{>>', '}}', './partials/', './partials/');
addPosts(contentDictionary, replacementDictionary['postMainPage']);

copyAssets('./assets', OUTPUT_FOLDER);
copyAssets('./partials', OUTPUT_FOLDER);

