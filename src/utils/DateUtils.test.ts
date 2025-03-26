import {getMillisToDateString} from './DateUtils';

// describe: 테스트가 여러개일 때 하나로 묶기 위함
describe('특정 millisecond를 받았을 때', () => {
  test('해당하는 날짜의 문자열로 변경 합니다', () => {
    expect(getMillisToDateString(1719500400000)).toBe('2024-06-28');
  });
  test('10이하의 월, 10이하의 일수를 가진다면 0N의 형태로 변경합니다.', () => {
    expect(getMillisToDateString(1732719600000)).toBe('2024-11-28');
  });
});
