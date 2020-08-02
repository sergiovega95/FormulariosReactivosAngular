import { AbstractControl,ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export class MyValidations {
    
    constructor() { 

    }

    //Custom validations con control
    public static IsMayorEdad(control: AbstractControl)
    {
        if(control.value)
        {
            if (control.value<18)
            {
               return { IsMenorEdad: true };
            }   
        }             
        return null;
    }

    //Custom validations pasandole un parametros
    public static IsMayorEdadWithParamts(edadminima:number)
    {
        return (control: AbstractControl)=>
        {
          if(control.value)
          {
            if (control.value<edadminima)
            {
              return { IsMenorEdad: true };
            } 
          }         
               
          return null;
        }        
    }
   
    //Custom validations asincronas con promesas, el timer es para simular la conexión a un servicio
    public static IsEmailFree(control: AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null>
    {    
        
         //declaracion de la promesa.
        let promise = new Promise( (resolve, reject) => 
        {
            if(control.value)
            {              
               if(control.value ==='sergiovega9511@gmail.com')
               {
                  return resolve({IsEmailLock:true});
               }

            }
            return resolve(null);
           
        });
        return promise;
        
    }
}