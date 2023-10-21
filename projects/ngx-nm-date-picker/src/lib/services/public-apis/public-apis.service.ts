import { Injectable } from "@angular/core";
import { IHeaderActions } from "../../interfaces/header-action.interface";

@Injectable()
export class NmPublicApiService {
  public headerActions: IHeaderActions | null = null;
}
