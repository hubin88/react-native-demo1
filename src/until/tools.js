/**
 * Created by huoban-xia on 2017/7/17.
 */
import {
  DatePickerAndroid, TimePickerAndroid
} from 'react-native';
export async function openDataPick(min, max, callback) {
  try {
    const options = { date: new Date(), minDate: min };
    if (max) {
      options.maxDate = max;
    }
    const { action, year, month, day } = await
      DatePickerAndroid.open(options);
    if (action !== DatePickerAndroid.dismissedAction) {
      callback(year, month, day);
    }
  } catch ({ code, message }) {
    console.warn('Cannot open date picker', message);
  }
}
export async function openTimePick(callback) {
  try {
    const { action, hour, minute } = await TimePickerAndroid.open({
      hour: new Date().getHours(),
      is24Hour: true,
    });
    if (action !== TimePickerAndroid.dismissedAction) {
      callback(hour, minute);
    }
  } catch ({ code, message }) {
    console.warn('Cannot open time picker', message);
  }
}