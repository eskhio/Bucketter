const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const v = require('./verbose');


class parser {

    constructor(dom) {
        this.document = (new JSDOM(dom)).window.document;
        v.printStep(`Document "${this.getTitle()}"`);
        v.printOK("loaded!");
    }
    getURL() {
        return this.document.location;
    }
    getBody() {
        return this.document.body.innerHTML;
    }
    getTitle() {
        return this.document.title;
    }
    doContains(sth) {
       return this.document.body.innerHTML.match(new RegExp(sth));
    }
    doContainsSelector(selector, from) {
        return from.indexOf(sth)>-1 ? true:false;
    }
    getMostUsedSelector(){
        let classObj = [];
        // All elements
        Array.from(this.document.querySelectorAll("*")).map(x=> x.classList).map((allClassesFromEle) => {
            for(let aClass of allClassesFromEle){
                classObj.push({"class":aClass, "occurences":this.document.querySelectorAll("[class='"+aClass+"']").length});
            }
        });
        classObj.sort((a,b)=>b["occurences"]-a["occurences"])
        return classObj.filter((obj, index) => { 
            return classObj.map(obj => obj['class']).indexOf(obj['class']) === index;    
        });
    }
    getMostUsedElements(){
        let classObj = [];
        // All elements
        Array.from(this.document.querySelectorAll("*")).map(x=> x.localName).map((anElement) => {
            classObj.push({"localName":anElement, "occurences":this.document.querySelectorAll(anElement).length});
        });
        classObj.sort((a,b)=>b["occurences"]-a["occurences"])
        return classObj.filter((obj, index) => { 
            return classObj.map(obj => obj['localName']).indexOf(obj['localName']) === index;    
        });
    }
}
module.exports = parser;