import { helper } from '@ember/component/helper';

export default helper(function loopFor(params/*, hash*/) {
  return new Array(params[0]);
});
