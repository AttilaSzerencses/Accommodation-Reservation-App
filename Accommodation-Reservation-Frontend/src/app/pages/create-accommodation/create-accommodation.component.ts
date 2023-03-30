import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Address } from 'src/app/shared/models/address';
import { Accommodation } from 'src/app/shared/models/accommodation';
import { Amenity } from 'src/app/shared/models/amenity';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    secondPicture: new FormControl(),
    thirdPicture: new FormControl(),
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

  createOrUpdate = "Create"
  amenitiesForm: FormGroup;
  userId: number = Number(localStorage.getItem("userId"))
  user: Person;
  accommodationId: number;
  accommodation: Accommodation;
  mainPagePicture: File;
  secondImage: File;
  thirdImage: File;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private accommodationService: AccommodationService, private router: Router, private personService: PersonService) { }

  ngOnInit(): void {
    this.amenitiesForm = this.formBuilder.group({});
    this.getCurrentUser();
    this.getSentParamsFromUrl();
  }

  public getSentParamsFromUrl() {
    this.route.queryParams.subscribe(params => {
      this.accommodationId = params['accommodation'] || 0;
      if (this.accommodationId !== 0) {
        this.createOrUpdate = "Update";
        this.getAccommodation();
      } else {
        this.setAmenitiesStateForCreate();
      }
    })
  }

  public getCurrentUser() {
    const person = this.personService.getPersonById(this.userId).subscribe((data: Person) => {
      person.unsubscribe();
      this.user = data;
    })
  }

  public getAccommodation() {
    this.accommodationService.getAccommodationById(this.accommodationId).toPromise().then(data => {
      if (data != undefined) {
        this.accommodation = data;
        this.setFormValues();        
        this.setAmenitiesStateForUpdate();
      }
    });
  }

  public setAmenitiesStateForCreate() {
      this.amenities.forEach(amenity => {
          this.amenitiesForm.addControl(amenity.id, this.formBuilder.control(false))
      });  
  }

  public setAmenitiesStateForUpdate() {
    if (this.accommodationId !== 0){
      let amenityNames: Array<String> = [];
    this.accommodation.amenities?.forEach(amenity => {
      amenityNames.push(amenity.name);
    })
    this.amenities.forEach(amenity => {
      if(amenityNames.includes(amenity.id)){
        this.amenitiesForm.addControl(amenity.id, this.formBuilder.control(true))
      } else {
        this.amenitiesForm.addControl(amenity.id, this.formBuilder.control(false))
      }
    });
    }
  }

  public setFormValues() {
    this.accommodationForm.get('acoomodationName')?.setValue(this.accommodation.name);
    this.accommodationForm.get('phoneNumber')?.setValue(this.accommodation.phoneNumber);
    this.accommodationForm.get('postalCode')?.setValue(this.accommodation.address?.postCode);
    this.accommodationForm.get('city')?.setValue(this.accommodation.city);
    this.accommodationForm.get('street')?.setValue(this.accommodation.address?.street);
    this.accommodationForm.get('houseNumber')?.setValue(this.accommodation.address?.houseNumber);
    this.accommodationForm.get('description')?.setValue(this.accommodation.description);
  }

  onMainPagePictureSelected(event: any) {
    const file = event.target.files[0];
    this.mainPagePicture = file;
  }

  onSecondImageSelected(event: any) {
    const file = event.target.files[0];
    this.secondImage = file;
  }

  onThirdImageSelected(event: any) {
    const file = event.target.files[0];
    this.thirdImage = file;
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

  saveOrUpdateAccommodation() {
    if (this.accommodationId === 0) {
      this.saveAccommodation();
    } else {
      this.updateAccommodation();
    }
  }

  saveAccommodation() {
    if (this.accommodationForm.valid) {
      let accommodationAddress: Address = {
        postCode: this.accommodationForm.get('postalCode')?.value,
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

      this.accommodationService.addAccommodation(accommodation, this.mainPagePicture, this.secondImage, this.thirdImage).subscribe(
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

  updateAccommodation() {
    if (this.accommodationForm.valid) {
      let updatedAccommodationAddress: Address = {
        postCode: this.accommodationForm.get('postalCode')?.value,
        city: this.accommodationForm.get('city')?.value,
        street: this.accommodationForm.get('street')?.value,
        houseNumber: this.accommodationForm.get('houseNumber')?.value,
      };
      let amenitisUpdatedAmenitis = this.getCheckedAmenities();
      let updateAccommodation = this.accommodation;
      updateAccommodation.name = this.accommodationForm.get('acoomodationName')?.value;
      updateAccommodation.phoneNumber = this.accommodationForm.get('phoneNumber')?.value;
      updateAccommodation.description = this.accommodationForm.get('description')?.value;
      updateAccommodation.city = this.accommodationForm.get('city')?.value;
      updateAccommodation.address = updatedAccommodationAddress;
      //updateAccommodation.amenities = amenitisUpdatedAmenitis;

      this.accommodationService.updateAccommodation(updateAccommodation, this.mainPagePicture, this.secondImage, this.thirdImage).subscribe(
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

  public errorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Something is missing or the given data is incorrect!',
      text: "You have to fill every field and check every data is correct!",
    })
  }

  public succesAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Successfull ' + this.createOrUpdate + "!",
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['/accommodationManagement'])
  }

}
