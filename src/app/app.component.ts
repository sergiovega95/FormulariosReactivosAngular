import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface usuario {
  usuario: string;
  email: string;
  password: string;
  repeatpassword: string;
  departamento:{
    id:string,
    nombre:string
  };
  ciudad:{
    id:string,
    nombre:string
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  ciudades:any[]=
  [{
    id:1,
    nombre:'Bucaramanga',
    idDepartamento:1

  },
  {
    id:2,
    nombre:'Bogota',
    idDepartamento:2
  }];

  departamentos:any[]=
  [{
    id:1,
    nombre:'Santander'   

  },
  {
    id:2,
    nombre:'Cundinamarca'
  }];

  usuario:usuario={usuario:'murmullo95',email:'sergiovega9511@gmail.com',
                  password:'123456',repeatpassword:'123456',
                  ciudad:this.ciudades[0], departamento:this.departamentos[0]};
 
  formulario: FormGroup;

  constructor() {
    console.log(this.ciudades);    
    this.buildForm();      
  }

  ngOnInit() {
    
  }

  private buildForm() {
    this.formulario = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email,Validators.required]),
      password: new FormControl('', [Validators.required,Validators.pattern('^.{4,8}$')]),
      ciudad: new FormControl('', [Validators.required]),
      departamento: new FormControl('', [Validators.required]),
      repeatpassword: new FormControl('', [Validators.required,Validators.pattern('^.{4,8}$')]), 
       
    });    
  }

 save()
 {     
   if(this.formulario.valid)
   {
     //persistir la información
     console.log(this.formulario.value);
     alert("Formulario enviado");    
     
   }  
   else
   {
     this.formulario.markAllAsTouched();
   }  
 }

 //Precagar la info de un formulario utilizando un objeto completo, 
 //siempre y cuando tenga la misma estructura del formulario
 precargarInfo()
 {   
   this.formulario.setValue(this.usuario);
 }
 
 LimpiarFormulario(){

  this.formulario.reset();

 }

}

