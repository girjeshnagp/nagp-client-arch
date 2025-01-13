export class CorsWorker {
    private readonly worker: Worker;
   
   constructor(url: string | URL) {
       const objectURL = URL.createObjectURL(
           new Blob([`importScripts(${JSON.stringify(url.toString())});`], {
               type: 'application/javascript'
           })
       );
       this.worker = new Worker(objectURL);
       URL.revokeObjectURL(objectURL);
   }
   
   getWorker() {
       return this.worker;
    }
   }