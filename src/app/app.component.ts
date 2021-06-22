import { Component } from '@angular/core';
import { ReadCoursesService } from './eduction.services';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyAppMedical';
  myForm !: FormGroup;
  categoryFormArray !: FormArray;
  arr: any = [];
  constructor(
    private appSettingsService: ReadCoursesService, private fb: FormBuilder
  ) { }
  courseDetails: any[] = []
  res: any
  filterNameHint: any;
  filterNameAction: any;
  filterForDetails: any = [];
  filterName: any
  caterioes: any = [
    { category: "Development" },
    { category: "Finance" },
    { category: "IT & Software" },
    { category: "Other" },
  ]
  onClickFilter(event: any) {
    console.log('event', event);
    console.log('event-id', event.target.id);
    console.log('event-checked', event.srcElement.checked);

    this.updateFilter('CourseCategory', event);
  }
  updateFilter(filterName: string, event: any) {
    console.log(filterName, event, "//*");
    this.filterNameHint = filterName;
    this.filterNameAction = event.target.id
    let selectedDimensions: string[] = this.filterName;
    if (selectedDimensions == null) selectedDimensions = [];

    if (event.srcElement.checked) {

      selectedDimensions.push((event.target.id as string).split('_')[1]);
    } else {
      for (let i = 0; i < selectedDimensions.length; i++)
        if (selectedDimensions[i] == (event.target.id as string).split('_')[1]) {
          selectedDimensions.splice(i, 1);
        }
    }

    // this.filterName.reset(selectedDimensions);



    console.log(" filter by :", filterName, "is = ", event.target.id)
    this.filterForDetails.push({
      filterName: filterName,
      event: event.target.id
    })
    console.log(this.filterForDetails)
  }
  // formData: FormGroup = this.fb.group({
  //   courseDuration: null,
  //   courseCategory: null,


  // });
  id: any = "1233";
  // this.id="1233";
  ngOnInit() {
    this.myForm = this.fb.group({
      catName: this.fb.array([])
    });
    this.categoryFormArray = <FormArray>this.myForm.controls.catName;
    this.getAllCourses()
    this.getStudentCourses()
    //  this.filterName.valueChanges.subscribe((data:any) => this.getAllCourses()
    //  console.log(data)
    //  );

  }
  onChange(category: string, event: any) {
    let isChecked = event.srcElement.checked
    if (isChecked) {
      this.categoryFormArray.push(new FormControl(category));
    } else {
      let index = this.categoryFormArray.controls.findIndex(x => x.value == category);
      this.categoryFormArray.removeAt(index);
    }
    console.log("form", this.categoryFormArray.value);
    this.getAllCourses()
  }
  getAllCourses() {
    this.appSettingsService.getJSON().subscribe(data => {
      this.res = data
      console.log("services", data);
      this.courseDetails = []
      //  this.filterName=data.CourseCategory
      for (let i = 0; i < this.res.length; i++) {
    //  this.courseDetails.push({
    //      courseImg:this.res[i].CourseImg,
    //      courseLevel:this.res[i].courseLevel,
    //      courseDuration:this.res[i].CourseDuration,
    //      coursePrice:this.res[i].CoursePrice,
    //      availableSeats:this.res[i].AvailableSeats,
    //      courseName:this.res[i].CourseName
    //    })   
           if (this.categoryFormArray.length > 1) {
          for (let j = 0; j < this.categoryFormArray.length; j++) {
            if (this.res[i].CourseCategory == this.categoryFormArray.value[j]) {
              // this.courseDetails.push(this.res[i])
              this.courseDetails.push({
                courseImg: this.res[i].CourseImg,
                courseLevel: this.res[i].courseLevel,
                courseDuration: this.res[i].CourseDuration,
                coursePrice: this.res[i].CoursePrice,
                availableSeats: this.res[i].AvailableSeats,
                courseName: this.res[i].CourseName
              })
            }
          }
        }

        if (this.res[i].CourseCategory == this.categoryFormArray.value) {
          //  this.courseDetails.push(this.res[i])
          this.courseDetails.push({
            courseImg: this.res[i].CourseImg,
            courseLevel: this.res[i].courseLevel,
            courseDuration: this.res[i].CourseDuration,
            coursePrice: this.res[i].CoursePrice,
            availableSeats: this.res[i].AvailableSeats,
            courseName: this.res[i].CourseName
          })
        }
        //  this.courseDetails.push({
        //    courseImg:this.res[i].CourseImg,
        //    courseLevel:this.res[i].courseLevel,
        //    courseDuration:this.res[i].CourseDuration,
        //    coursePrice:this.res[i].CoursePrice,
        //    availableSeats:this.res[i].AvailableSeats,
        //    courseName:this.res[i].CourseName
        //  })
      }

      console.log("servicesBox", this.courseDetails);

    });
  }

  getStudentCourses() {
    this.appSettingsService.getStudentCourse(this.id).subscribe(data => {
      this.res = data
      // console.log("services",data.courseLevel);
      //  this.courseDetails=[]
      //  this.filterName=data.CourseCategory
      //  for(let i=0; i<data.length;i++){
      //  this.courseDetails.push({
      //    courseImg:data[i].CourseImg,
      //    courseLevel:data[i].courseLevel,
      //    courseDuration:data[i].CourseDuration,
      //    coursePrice:data[i].CoursePrice,
      //    availableSeats:data[i].AvailableSeats,
      //    courseName:data[i].CourseName
      //  })}
      console.log("servBox", this.res);

    });
  }
}

