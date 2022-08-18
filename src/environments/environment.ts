// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000',
  // apiUrl: 'https://mastercoach-api.innovant.studio',
  TWILIO_ACCOUNT_SID: 'ACa00a1b25450c592727057f4fe145085c',
  TWILIO_AUTH_TOKEN: 'db283cfd555ae4075776b408edea239c',

  TWILIO_API_KEY: 'SK07953fd3406ba6636c0d07aa50eae3be',
  TWILIO_API_SECRET: 'MK1FhcUYhdhT4wHzK5f0P7kC3JHsZ9M0',
  TWILIO_SERVICE_ID: 'ISd2084a2a8f3b4b958196cd5684bb5117',

  TWILIO_VIDEO_API_KEY: 'SK958332116250055e9a97995e606b5717',
  TWILIO_VIDEO_SECRET: 'P7cLYKcf5E3iKO3RSZGUgrfMOG4eHS0Z',

  // test stripe keys
  STRIPE_PUBLISHABLE_KEY:
    'pk_test_51LVyPOA1THLgkj12rflAkcCedKRC8Jc8pynHiEoKUCdlPieGSuPFHlvkG1MKbRoxqlp8ItUBLMbiWbDROmZUa4jY00GRhlNdto',
  STRIPE_SECRET_KEY:
    'sk_test_51LVyPOA1THLgkj12XMDaXP4xU1RNUFviY2Ov7F7mzXJQFzLwlUOGgAzavafGc2GvzsKOFqEPSYlIBcVVv11DNKdp00FbtaQtrC',

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
