import { Component, OnInit } from '@angular/core';
import {ReviewType} from "../../../../model/type/ReviewType";
import {ReviewTypeService} from "../../../../services/type/review-type.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-review-types',
  templateUrl: './review-types.component.html',
  styleUrls: ['./review-types.component.css']
})
export class ReviewTypesComponent implements OnInit {
  reviewTypes: ReviewType[] = [];
  reviewType: ReviewType = new ReviewType(null);
  modalID = "reviewTypeModal";

  constructor(private reviewTypeService: ReviewTypeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getReviewTypes();
  }

  getReviewTypes() {
    this.reviewTypeService.getAll().subscribe(
      data => this.reviewTypes = data
    )
  }

  reset(){
    this.reviewType = new ReviewType(null);
  }

  createOrUpdate() {
    this.reviewTypeService.save(this.reviewType).subscribe(
      result => {
        if (this.typeExists(this.reviewType.id)) {
          this.reviewTypes[this.reviewTypes.findIndex(item => item.id == result.id)] = result;
        } else {
          this.reviewTypes.push(result)
        }
        this.reviewType = new ReviewType(null);
        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      error => {
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji");
      }
    )
  }

  typeExists(id: string) {
    return this.reviewTypes.some(item => item.id == id);
  }

  edit(reviewType: ReviewType) {
    Object.assign(this.reviewType, reviewType)
  }

  delete(reviewType: ReviewType) {
    this.reviewTypeService.delete(reviewType).subscribe(
      result => {
        this.reviewTypes = this.reviewTypes.filter(item => item != reviewType)
        this.toastr.success("Usunięto pomyślnie");
        this.reviewType = new ReviewType(null);
      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania");
      }
    )
  }
}
