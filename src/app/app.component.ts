import { Component } from "@angular/core";
import { Platform, MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Plugins, Capacitor } from "@capacitor/core";
const { SplashScreen } = Plugins;
import { NotificationService } from "./shared/services/notification/notification.service";
import { DbService } from "./shared/services/db/db.service";
import { ThemeService } from "./feature/theme/theme-service/theme.service";
import { SurveyService } from "./feature/survey/survey.service";
import { environment } from "src/environments/environment";
import { TaskActionService } from "./shared/services/task/task-action.service";
import { UserMetaService } from "./shared/services/userMeta/userMeta.service";
import { TourService } from "ngx-tour-md-menu";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  APP_VERSION = environment.version;
  skipTutorial: boolean;
  constructor(
    private platform: Platform,
    private menuController: MenuController,
    private router: Router,
    private notifications: NotificationService,
    private dbService: DbService,
    private userMetaService: UserMetaService,
    private themeService: ThemeService,
    private surveyService: SurveyService,
    /** Inject in the main app component to start tracking actions immediately */
    public taskActions: TaskActionService,
    public tourService: TourService
  ) {
    this.initializeApp();
    this.tourService.events$.subscribe(x => {
      console.log(x);
    });
    this.tourService.initialize([
      {
        stepId: "mod_picker",
        anchorId: "modulePicker",
        route: "/module_list",
        title: "Pick a module",
        content: "Select which module to start here",
      },
      {
        anchorId: "startModuleBtn",
        route: "/module_list",
        title: "Click here to start the module",
        content: "This will take you to the module steps page",
      }
    ]);
    setTimeout(() => {
      this.tourService.start();
    }, 4000);
  }

  async initializeApp() {
    this.themeService.init();
    this.platform.ready().then(async () => {
      this.dbService.init();
      const user = await this.userMetaService.init();
      if (!user.first_app_open) {
        await this.surveyService.runSurvey("introSplash");
        await this.surveyService.runSurvey("analytics");
        await this.userMetaService.setUserMeta({ first_app_open: new Date().toISOString() });
      }
      this.skipTutorial = true;
      this.menuController.enable(true, "main-side-menu");
      if (Capacitor.isNative) {
        SplashScreen.hide();
        this.notifications.init();
      }
    });
  }

  clickOnMenuItem(id: string) {
    this.menuController.close("main-side-menu");
    this.router.navigateByUrl("/" + id);
  }
}
