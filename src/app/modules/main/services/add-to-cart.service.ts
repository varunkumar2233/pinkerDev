import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({   
    providedIn: 'root'
})

export class addToCartServie {
    constructor(private http: HttpClient) {

    }
    addReporttoCart(request) {
        return this.http.post(`${environment.addReportToCart}`,request);
    }
    displayCartData()
    { 
        return this.http.get(`${environment.getCartData}`);
    }
    deleteReportFromCart(id)
    {
        return this.http.patch(`${environment.deleteReportsfromCart}`,id);
    }
    addCreditToCartDB(request)
    {
        return this.http.patch(`${environment.updateCredits}`,request);
    }
    
}