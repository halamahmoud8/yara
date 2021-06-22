import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
// import data from "../assets/img/"

@Injectable({
    providedIn: 'root'
})
export class ReadCoursesService {
    constructor(private http: HttpClient) {

        this.getJSON().subscribe((data:any) => {
            console.log("data",data);
        });
    }

    public getJSON(){
 
        return this.http.get("../assets/img/courses.json");
    }
    // StudentId:string="1233"

    public getStudentCourse(StudentId:any){

        return this.http.get("../assets/img/requests.json/",StudentId)

        // return this.http.get("../assets/img/requests.json/").map( (res: Response) => res[0].products.filter(x=>x.id==StudentId));;
    }






}
