import { Component, OnInit } from '@angular/core';
import { PhotosService } from './../../services/photos.service';
import { ActivatedRoute } from '@angular/router'; 
import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})


export class PhotosComponent implements OnInit {
  photos:any;
  albumId:any;
  photoData:any;
  photoForm!: FormGroup;
  editPhotoForm!: FormGroup;
  showEditPhotoForm = false;
  showCreatePhotoForm = false
  editFormId:any;
  submitted = false;

  // variables to status of request;
  photoAdded = false;
  photoEdited = false;
  photoDeleted = false;
  photoDeletedId:any;

  constructor(
    private photosService: PhotosService,
    private route: ActivatedRoute,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.albumId = this.route.snapshot.params.albumId;
    // this.photos = this.photosService.getPhoto(this.albumId);
    this.photosService.getPhoto(this.albumId).subscribe((data) => {
      // console.log('data', data);
      this.photoData = data;
    });

    this.initForm();
  }

  initForm() {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.photoForm = this.fb.group({
      title: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern(reg)]]
    });
    this.editPhotoForm = this.fb.group({
      title: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern(reg)]]
    });
  }

  get addForm() { return this.photoForm.controls; }
  get editForm() { return this.editPhotoForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.photoForm.invalid) {
        return;
    }
    if (this.editPhotoForm.invalid) {
      return;
    }
  }

  showCreateForm(){
    this.showCreatePhotoForm = !this.showCreatePhotoForm;
    console.log(this.showCreatePhotoForm)
  }

  addPhoto(event:any, photoform:any) {
    const photoData = photoform.value;
    this.photosService.addPhoto(photoData).subscribe((data) => {
      console.log('Photo added', data);
      this.photoAdded = true;
      setTimeout(() => {
        this.photoAdded = false;
      }, 2000);
    });
  }

  editPhoto(event:any, data:any) {
    this.showEditPhotoForm = true;
    this.editFormId = data.Id;
    this.editPhotoForm = this.fb.group({
      id: [data.id],
      title: [data.title],
      url: [data.url]
    });
  }

  editPhotoData(event:any, photoform:any) {
    const photoData = photoform.value;
    this.photosService.editPhoto(photoData).subscribe((data) => {
      console.log('photo edited', data);
      this.photoEdited = true;
      setTimeout(() => {
        this.photoEdited = false;
        this.showEditPhotoForm = false;
      }, 2000);
    });
  }

  deletePhoto(event:any, photoData:any) {
    this.photosService.deletePhoto(photoData).subscribe((data) => {
      console.log('photo deleted', data);
      this.photoDeletedId = photoData.id;
      this.photoDeleted = true;
      setTimeout(() => {
        this.photoDeleted = false;
      }, 2000);
    });
  }

}
