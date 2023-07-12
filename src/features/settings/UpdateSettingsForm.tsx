import { FocusEvent } from 'react';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

import { SettingFieldType } from '../../types/types';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdateSetting(
    event: FocusEvent<HTMLInputElement>,
    settingField: SettingFieldType
  ) {
    const { value } = event.target;

    if (!value) return;
    updateSetting({ [settingField]: +value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={settings?.minBookingLength || ''}
          onBlur={(event: FocusEvent<HTMLInputElement>) =>
            handleUpdateSetting(event, 'minBookingLength')
          }
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={settings?.maxBookingLength || ''}
          onBlur={(event: FocusEvent<HTMLInputElement>) =>
            handleUpdateSetting(event, 'maxBookingLength')
          }
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={settings?.maxBookingGuestsPerBooking || ''}
          onBlur={(event: FocusEvent<HTMLInputElement>) =>
            handleUpdateSetting(event, 'maxBookingGuestsPerBooking')
          }
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={settings?.breakfastPrice || ''}
          onBlur={(event: FocusEvent<HTMLInputElement>) =>
            handleUpdateSetting(event, 'breakfastPrice')
          }
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
