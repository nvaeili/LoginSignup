import { FormControl, FormGroup } from "@angular/forms";

//for the login to create a popup when invalid (to display error in the inputted values)
export default class ValidateForm{
    static validateAllFormFields(formGroup: FormGroup){
        Object.keys(formGroup.controls).forEach(field=>{
    
          const control = formGroup.get(field);
    
          if(control instanceof FormControl){
            control.markAsDirty({onlySelf:true})
          }
          else if(control instanceof FormGroup){
            this.validateAllFormFields(control)
          }
    
          })
        }
}