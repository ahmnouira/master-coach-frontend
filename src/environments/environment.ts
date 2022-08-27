// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000',
  // apiUrl: 'https://mastercoach-api.innovant.studio',
  /* the front app url */
  APP_URL: 'http://localhost:4200',
  //APP_URL: "https://mastercoach.innovant.studio",

  TWILIO_ACCOUNT_SID: 'ACf2cc84e73f311b5bc821ee8582a1e6d8',
  TWILIO_AUTH_TOKEN: '69815c0adf7f62f7b1cfdc6719ad673e',
  TWILIO_API_KEY: 'SK24f4735fff4acda934acc1d687f7ccb9',
  TWILIO_API_SECRET: 'wgHN180to7eI6QjynVGMfAJIYiBORRO6',
  TWILIO_SERVICE_ID: 'IS0a0c332c48814ddd9279a7ae56fb1aea',

  TWILIO_VIDEO_API_KEY: 'SK958332116250055e9a97995e606b5717',
  TWILIO_VIDEO_SECRET: 'P7cLYKcf5E3iKO3RSZGUgrfMOG4eHS0Z',

  // test stripe keys
  STRIPE_PUBLISHABLE_KEY:
    'pk_test_51LVyPOA1THLgkj12rflAkcCedKRC8Jc8pynHiEoKUCdlPieGSuPFHlvkG1MKbRoxqlp8ItUBLMbiWbDROmZUa4jY00GRhlNdto',
  STRIPE_SECRET_KEY:
    'sk_test_51LVyPOA1THLgkj12XMDaXP4xU1RNUFviY2Ov7F7mzXJQFzLwlUOGgAzavafGc2GvzsKOFqEPSYlIBcVVv11DNKdp00FbtaQtrC',

  // the app name
  APP_NAME: 'MasterCoach',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
