import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

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


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.amenitiesForm = this.formBuilder.group({});
    this.amenities.forEach(amenity => {
      this.amenitiesForm.addControl(amenity.id, this.formBuilder.control(false));
    });
    
  }
  

  getCheckedAmenities() {
    const checkedAmenities = [];
    const formValue = this.amenitiesForm.getRawValue();
    for (const key in formValue) {
      if (formValue[key]) {
        checkedAmenities.push(key);
      }
    }
    console.log(checkedAmenities);
    
    return checkedAmenities;
  }

}
