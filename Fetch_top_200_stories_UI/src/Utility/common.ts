import { throwError } from "rxjs";

export class Common {


    static handleError(error: { error: { message: string; }; status: any; message: any; }) {
        let errorMessage = '';
        
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            const checkData = window.location.href;
            
            if (error.status=='417' || error.status=='403') {                
                // error page here
            }
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // window.alert(errorMessage);
        return throwError(errorMessage);
    }

}
