import {Injectable} from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpHandler} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {isNullOrUndefined} from "util";
import { environment } from "src/environments/environment";

@Injectable()
export class UserRequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService){

  }

  // interceptor transforms an outgoing request before passing it to the next interceptor
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // get the users access token using our helper function
    req = req.clone({url: `${environment.baseUrl}${req.url}`})

    // const accessToken = this.authService.getAccessToken();

 //   return next.handle(req);

    // set the header
    // // in case it isn't set
    if(isNullOrUndefined(localStorage.getItem('cl'))){
      return next.handle(req);
    }


   
    req = req.clone({
      setHeaders: {
        client: localStorage.getItem('cl'), 
        uid: localStorage.getItem('uid'), 
        "access-token": localStorage.getItem('access'),
        'Content-Type':  'application/json'
      }
    });
    return next.handle(req);
  }
}