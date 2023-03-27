import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Address } from 'src/app/shared/models/address';
import { Accommodation } from 'src/app/shared/models/accommodation';
import { Amenity } from 'src/app/shared/models/amenity';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';
import { Person } from 'src/app/shared/models/person';

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent implements OnInit {

  accommodationForm = new FormGroup({
    acoomodationName: new FormControl(),
    phoneNumber: new FormControl(),
    postalCode: new FormControl(),
    city: new FormControl(),
    street: new FormControl(),
    houseNumber: new FormControl(),
    mainPagePicture: new FormControl(),
    description: new FormControl(),
  });

  amenities = [
    { id: 'Free Parking', name: 'Free Parking' },
    { id: 'Free WiFi', name: 'Free WiFi' },
    { id: 'Air Conditioning', name: 'Air Conditioning' },
    { id: 'Pets allowed', name: 'Pets allowed' },
    { id: 'Daily housekeeping', name: 'Daily housekeeping' },
    { id: 'Designated smoking area', name: 'Designated smoking area' },
    { id: 'Safety deposit box', name: 'Safety deposit box' },
    { id: 'Luggage Storage', name: 'Luggage Storage' },
    { id: 'Heating', name: 'Heating' },
    { id: 'Fridge', name: 'Fridge' },
    { id: 'Tv', name: 'Tv' },
    { id: 'Microwave', name: 'Microwave' },
    { id: 'Cleaning supply', name: 'Cleaning supply' },
    { id: 'Own Bathroom', name: 'Own Bathroom' }
  ];

  amenitiesForm: FormGroup;
  userId: number = Number(localStorage.getItem("userId"))
  user: Person;
  mainPagePicture: File;

  constructor(private formBuilder: FormBuilder, private accommodationService: AccommodationService, private router: Router, private personService: PersonService) { }

  ngOnInit(): void {
    this.amenitiesForm = this.formBuilder.group({});
    this.amenities.forEach(amenity => {
      this.amenitiesForm.addControl(amenity.id, this.formBuilder.control(false));
    });
    this.getCurrentUser();
  }

  public getCurrentUser() {
    const person = this.personService.getPersonById(this.userId).subscribe((data: Person) => {
      person.unsubscribe();
      this.user = data;
    })
  }

  generateRandomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.mainPagePicture = file;
  }
  


  getCheckedAmenities() {
    let checkedAmenities: Array<Amenity> = [];
    const formValue = this.amenitiesForm.getRawValue();
    for (const key in formValue) {
      if (formValue[key]) {
        let amenity: Amenity = {
          name: key
        }
        checkedAmenities.push(amenity);
      }
    }
    
    return checkedAmenities;
  }

  saveAccommodation() {
    if(this.accommodationForm.valid) {
      let accommodationAddress: Address = {
        postCode: 1,
        city: this.accommodationForm.get('city')?.value,
        street: this.accommodationForm.get('street')?.value,
        houseNumber: this.accommodationForm.get('houseNumber')?.value,
      };
      let amenitisForCreation = this.getCheckedAmenities();
      let accommodation: Accommodation = {
        name: this.accommodationForm.get('acoomodationName')?.value,
        phoneNumber: this.accommodationForm.get('phoneNumber')?.value,
        description: this.accommodationForm.get('description')?.value,
        city: this.accommodationForm.get('city')?.value,
        address: accommodationAddress,
        amenities: amenitisForCreation,
        person: this.user
      };

      this.accommodationService.addAccommodation(accommodation, this.mainPagePicture).subscribe(
        (response: any) => {
          this.succesAlert();
        },
        (error: HttpErrorResponse) => {
          this.errorAlert();
        });

    } else {
      this.errorAlert();
    }
  }

  public errorAlert(){
    Swal.fire({
      icon: 'error',
      title: 'Something is missing!',
      text: "You have to fill every field!",
    })
  }

  public succesAlert(){
    Swal.fire({
      icon: 'success',
      title: 'Successfull creation!',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['/profile'])
  }

}
