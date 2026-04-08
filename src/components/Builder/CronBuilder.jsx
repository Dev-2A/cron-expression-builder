import FieldSelector from "./FieldSelector";
import { FIELD_LABELS } from "../../constants/cronFields";

export default function CronBuilder({ fields, onFieldChange }) {
  return (
    <div className="space-y-4">
      <FieldSelector
        fieldName="minute"
        label={FIELD_LABELS.minute}
        value={fields.minute}
        onChange={(val) => onFieldChange("minute", val)}
      />
      <FieldSelector
        fieldName="hour"
        label={FIELD_LABELS.hour}
        value={fields.hour}
        onChange={(val) => onFieldChange("hour", val)}
      />
    </div>
  );
}
