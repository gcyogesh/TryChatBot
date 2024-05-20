import 'jquery';

declare global {
  interface JQuery {
    mCustomScrollbar(options?: any): JQuery;
  }
}
