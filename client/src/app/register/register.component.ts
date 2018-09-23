import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
// import { FormGroup, , } from '@angular/forms';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  filesToUpload: Array<File> = [];
  showFormError : boolean;
  registerForm: FormGroup;
  imgSrc : string = "";
  imageValid : boolean
  image1Valid : boolean = false
  image2Valid : boolean = false

  constructor(private auth: AuthenticationService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {

    this.registerForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required]),
      'name': new FormControl('', [Validators.required]),
      'age': new FormControl('', [Validators.required]),
      'skills': new FormControl('', [Validators.required]),
      'file1': new FormControl(null, [Validators.required]),
      'file2': new FormControl(null, [Validators.required]),
      'defaultImage': new FormControl('', [Validators.required]),
      //'newPassword': newPassword,
      //'reconfirmNewPassword': new FormControl('', [Validators.required, CustomValidators.equalTo(newPassword)])
    });
  }

  // getFileDimensionsError(){
  //   return this.imageValid;
  // }

  //file dimensions valdn logic
  checkFileDimensions(file, fileNumber) {
    //this.imageValid
    var that = this
    var fr = new FileReader;
    // var result
    fr.onload = function () { // file is loaded

      //that.imageValid
      var img = new Image;
      //var result
      img.onload = function () {
        if (img.width < 1280 || img.width < 960) {
          that.imageValid = false
        }
        else {
          that.imageValid = true
        }
        if (1 == fileNumber) {
          that.image1Valid = that.imageValid
        }
        else {
          that.image2Valid = that.imageValid
        }
      };

      img.src = fr.result; // is the data URL because called with readAsDataURL
    };

    fr.readAsDataURL(file)
  }

  register() {

    if (!this.image1Valid || !this.image2Valid) {
      alert('Please select images of atleast 1280 x 960 pixels size')
    }
    else {

      const formModel = this.registerForm.value;

      let fdata = new FormData();
      fdata.append('file1', this.fileName1);
      fdata.append('file2', this.fileName2);
      fdata.append('data', JSON.stringify(this.registerForm.value));

      if (1) {
        //this.auth.register(this.credentials).subscribe(() => {
        this.auth.register(formModel, fdata).subscribe((data) => {
          console.log('data')
          console.log(data)
          console.log('data')

          this.router.navigateByUrl('/profile');
        }, (err) => {
          console.error(err);
        });
      }
    }
  }


  fileName1: File = null;
  fileName2: File = null;
  onFileChange(event, fileNumber) {
    console.log(event);

    if (1 == fileNumber) {
      // console.log(this.fileName1)
      this.fileName1 = <File>event.target.files[0]; // <--- File Object for future use.
      this.checkFileDimensions(this.fileName1, 1)

      this.registerForm.controls['file1'].setValue(this.fileName1 ? this.fileName1.name : ''); // <-- Set Value for Validation
    }
    else {
      this.fileName2 = <File>event.target.files[0]; // <--- File Object for future use.
      this.checkFileDimensions(this.fileName2, 2)
      this.registerForm.controls['file2'].setValue(this.fileName2 ? this.fileName2.name : ''); // <-- Set Value for Validation
    }
    this.imgSrc = "";
    //display image preview before upload image
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgSrc = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      // this.imgSrcHeight = 100;
    }
  }


}
