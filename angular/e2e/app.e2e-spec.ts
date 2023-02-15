import { qTemplatePage } from './app.po';

describe('q App', function() {
  let page: qTemplatePage;

  beforeEach(() => {
    page = new qTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
