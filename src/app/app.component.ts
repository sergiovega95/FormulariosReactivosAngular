import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyValidations } from '../app/CustomValidations/myvalidations'

interface usuario {
  usuario: string;
  email: string;
  edad:number;
  password: string;
  repeatpassword: string;
  departamento: {
    id: string,
    nombre: string
  };
  ciudad: {
    id: string,
    nombre: string
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Propiedades
  ciudades: any[] =
    [{
      id: 1,
      nombre: 'Bucaramanga',
      idDepartamento: 1

    },
    {
      id: 2,
      nombre: 'Bogota',
      idDepartamento: 2
    }];

  departamentos: any[] =
    [{
      id: 1,
      nombre: 'Santander'

    },
    {
      id: 2,
      nombre: 'Cundinamarca'
    }];

  ciudadesFiltrada :any[]=[];

  usuario: usuario = {
    usuario: 'murmullo95', email: 'sergiovega9511@gmail.com',edad:20,
    password: '123456', repeatpassword: '123456',
    ciudad: this.ciudades[0], departamento: this.departamentos[0]
  };

  edadMayorEdad:number=18;

  formulario: FormGroup;

  constructor() {
    this.buildForm();
  }

  //Construir formulario
  private buildForm() {
    this.formulario = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required],[MyValidations.IsEmailFree]),
      edad: new FormControl('', [Validators.required,MyValidations.IsMayorEdadWithParamts(this.edadMayorEdad)]),
      password: new FormControl('', [Validators.required, Validators.pattern('^.{4,8}$')]),
      ciudad: new FormControl('', [Validators.required]),
      departamento: new FormControl('', [Validators.required]),
      repeatpassword: new FormControl('', [Validators.required, Validators.pattern('^.{4,8}$')]),

    },);
  }

  //Persistencia del formulario
  save() {
    if (this.formulario.valid) {
      //persistir la información
      console.log(this.formulario.value);  
      alert("Formulario enviado");

    }
    else {
      console.log(this.formulario.value);    
      this.formulario.markAllAsTouched();
    }
  }

  //Precagar la info de un formulario utilizando un objeto completo, siempre y cuando tenga la misma estructura del formulario
  precargarInfo() {
    this.formulario.setValue(this.usuario);
  }

  //Reset formulario
  LimpiarFormulario() {

    this.formulario.reset();

  }

  DepartamentoSeleccionado(data:any)
  {    
    let departamentoSeleccionado= JSON.parse(data);
    this.ciudadesFiltrada=[];
    this.ciudades.forEach(element =>
    {
       if(element.idDepartamento==departamentoSeleccionado.id)
       {
          this.ciudadesFiltrada.push(element);
       }
    });
    
    this.formulario.get('ciudad').setValue(null);
    var e = document.getElementById("selectboxMunicipios");
    e.removeAttribute("disabled");
  }

}

