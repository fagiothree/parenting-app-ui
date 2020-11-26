import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { BASE_USER_SETTINGS, UserSetting, UserSettingId } from './user.settings.model';

type CondensedFirebaseUserResult = {
  users: {
    uid: string,
    displayName: string,
    email: string
  }[],
  pageToken: string
};

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private lsPrefix = "user_settings.";

  private userSettings$: BehaviorSubject<UserSetting[]>;

  private oboUserId: string;

  constructor(private localStorageService: LocalStorageService, private http: HttpClient, private afAuth: AngularFireAuth) {
    const lsPopulatedSettings = BASE_USER_SETTINGS.map((setting) => {
      const lsValue = localStorageService.getString(this.lsPrefix + setting.id);
      return { ...setting, value: lsValue === null ? setting.value : lsValue };
    });
    this.userSettings$ = new BehaviorSubject(lsPopulatedSettings);
    /* Get user settings from server */
    this.getSettingsFromServer();
  }

  private getSettingsFromServer() {
    this.afAuth.idToken.subscribe((firebaseToken) => {
      this.http.get("/user-api/current-user/settings" + (this.oboUserId ? "?oboUserId=" + this.oboUserId : ""), {
        headers: {
          authorization: "Bearer " + firebaseToken
        }
      }).subscribe((serverSettings: UserSetting[]) => {
        for (let serverSetting of serverSettings) {
          this.setUserSetting(serverSetting.id, serverSetting.value, false);
        }
      });
    });
  }

  getUsersICanObo(): Observable<{ uid: string, displayName: string, email: string}[]> {
    return this.afAuth.idToken.pipe(
      mergeMap((firebaseToken) => {
        return this.http.get("/user-api/users", {
          headers: {
            authorization: "Bearer " + firebaseToken
          }
        });
      }),
      map((result: CondensedFirebaseUserResult) => result.users)
    );
  }

  setOboUserId(uid: string) {
    this.oboUserId = uid;
    this.getSettingsFromServer();
  }

  getAllUserSettings(): Observable<UserSetting[]> {
    return this.userSettings$.asObservable();
  }

  getUserSetting(id: UserSettingId): Observable<string> {
    return this.userSettings$.pipe(
      map((settings) => {
        const setting = settings.find((setting) => setting.id === id);
        return setting ? setting.value : undefined;
      }),
      filter((setting) => setting !== undefined)
    );
  }

  setUserSetting(id: UserSettingId, value: string, sendToServer = true) {
    this.localStorageService.setString(this.lsPrefix + id, value);
    const settings = this.userSettings$.getValue();
    const updatedSettings = settings.map((setting) => {
      if (setting.id === id) {
        return { ...setting, value: value };
      }
      return setting;
    });
    this.userSettings$.next(updatedSettings);
    if (sendToServer) {
      this.afAuth.idToken.subscribe((firebaseToken) => {
        this.http.post(
          "/user-api/current-user/settings" + (this.oboUserId ? "?oboUserId=" + this.oboUserId : ""),
          this.userSettings$.getValue(),
          {
            headers: {
              authorization: "Bearer " + firebaseToken
            }
          }).subscribe((postResult) => {
            console.log(`Updated user setting ${id} saved on server `, postResult);
          });
      });
    }
  }
}
