/////////////////////////////////////////////////////////////////////
// Use this class to insert into middlewares into the pipeline
// 
/////////////////////////////////////////////////////////////////////
// Author : Nicolas Chourot
// Lionel-Groulx College
/////////////////////////////////////////////////////////////////////

export default class MiddlewaresPipeline {
    constructor() {
        this.middlewares = [];
    }
    add(middleware) {
        this.middlewares.push(middleware);
       // CachedRequestManager.get()//Je crois je ne suis pas sûr
    }
    handleHttpRequest(HttpContext) {
        for (let middleware of this.middlewares) {
            if (middleware(HttpContext)) 
                return true;
        }
        return false;
    }
}