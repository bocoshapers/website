import { NgBocoPage } from './app.po';

describe('ng-boco App', () => {
  let page: NgBocoPage;

  beforeEach(() => {
    page = new NgBocoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
