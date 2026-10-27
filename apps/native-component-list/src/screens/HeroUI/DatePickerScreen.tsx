import { Calendar } from 'heroui-native-pro/calendar';
import { DatePicker } from 'heroui-native-pro/date-picker';
import { DateTimePicker } from 'heroui-native-pro/date-time-picker';
import { TimePicker } from 'heroui-native-pro/time-picker';
import { Label } from 'heroui-native/label';
import { View } from 'react-native';

export default function DatePickerScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24, gap: 24 }}>
      <DatePicker>
        <Label>Event date</Label>
        <DatePicker.Select>
          <DatePicker.Trigger>
            <DatePicker.Value />
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
          <DatePicker.Portal>
            <DatePicker.Overlay />
            <DatePicker.Content presentation="popover" width="trigger">
              <DatePicker.Calendar>
                <Calendar.Header>
                  <Calendar.Heading />
                  <Calendar.NavButton slot="previous" />
                  <Calendar.NavButton slot="next" />
                </Calendar.Header>
                <Calendar.Grid>
                  <Calendar.GridHeader>
                    {(day) => <Calendar.HeaderCell day={day} />}
                  </Calendar.GridHeader>
                  <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
                </Calendar.Grid>
              </DatePicker.Calendar>
            </DatePicker.Content>
          </DatePicker.Portal>
        </DatePicker.Select>
      </DatePicker>
      <TimePicker>
        <Label>Reminder</Label>
        <TimePicker.Select>
          <TimePicker.Trigger>
            <TimePicker.Value />
            <TimePicker.TriggerIndicator />
          </TimePicker.Trigger>
          <TimePicker.Portal>
            <TimePicker.Overlay />
            <TimePicker.Content presentation="popover" width="trigger">
              <TimePicker.Wheel />
            </TimePicker.Content>
          </TimePicker.Portal>
        </TimePicker.Select>
      </TimePicker>
      <DateTimePicker>
        <DateTimePicker.Select>
          <DateTimePicker.Trigger>
            <DateTimePicker.Value />
            <DateTimePicker.TriggerIndicator />
          </DateTimePicker.Trigger>
          <DateTimePicker.Portal>
            <DateTimePicker.Overlay />
            <DateTimePicker.Content presentation="popover" width="trigger">
              <DateTimePicker.Wheel />
            </DateTimePicker.Content>
          </DateTimePicker.Portal>
        </DateTimePicker.Select>
      </DateTimePicker>
    </View>
  );
}
