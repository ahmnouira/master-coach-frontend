import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FileHelper } from 'src/app/helpers/FileHelper';
import { UserRole } from 'src/app/models/role.enum';
import { RouteService } from 'src/app/services/route-service/route.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input() title: string;
  @Input() photo: string | File;
  @Input() role: UserRole;

  constructor(private routeService: RouteService) {}

  ngOnInit(): void {
    this.getUserPicture();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getUserPicture();
  }

  handleClick() {
    this.routeService.navigate([`/pages/${this.role.toLowerCase()}/settings`]);
  }
  getUserPicture() {
    if (this.photo) {
      if (
        typeof this.photo === 'string' &&
        this.photo == '/assets/img/common/utilisateur.png'
      ) {
        return;
      }
      this.photo = FileHelper.getUrl(this.photo);
    } else this.photo = '/assets/img/common/utilisateur.png';
  }
}
