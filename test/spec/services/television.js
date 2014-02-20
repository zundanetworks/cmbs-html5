'use strict';

describe('Service: television', function () {

  // load the service's module
  beforeEach(module('yoApp'));

  // instantiate service
  var television;
  beforeEach(inject(function (_television_) {
    television = _television_;
  }));

  it('should do something', function () {
    expect(!!television).toBe(true);
  });

});
