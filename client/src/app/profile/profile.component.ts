import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails;
  formModel: any = {};
  edit: {} = { 'name': false, 'age': false, 'skills': false };
  image1Path : string;
  image2Path : string

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
      this.image1Path = 'http://localhost:3000/uploads/'+this.details.file1
      this.image2Path = 'http://localhost:3000/uploads/'+this.details.file2
    }, (err) => {
      console.error(err);
    });
  }

  //toggle show hide
  editField(field) {
    this.edit[field] = !this.edit[field]
  }

  onSubmit() {
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formModel))
  }

  //save to db
  saveField(fieldName, fieldValue) {
    console.log(fieldName)
    this.details[fieldName] = fieldValue
    this.auth.updateProfile({'_id' : this.details._id , [fieldName] : fieldValue}).subscribe(() => {
      //this.router.navigateByUrl('/profile');
      this.edit[fieldName] = !this.edit[fieldName]
    }, (err) => {
      console.error(err);
    });

  }

}
