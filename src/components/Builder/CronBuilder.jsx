import FieldSelector from "./FieldSelector";
import { FIELD_LABELS } from "../../constants/cronFields";

const BUILDER_FIELDS = ["minute", "hour", "dayOfMonth", "month", "dayOfWeek"];

export default function CronBuilder({ fields, onFieldChange }) {
  return (
    <div className="space-y-4">
      {BUILDER_FIELDS.map((fieldName) => (
        <FieldSelector
          key={fieldName}
          fieldName={fieldName}
          label={FIELD_LABELS[fieldName]}
          value={fields[fieldName]}
          onChange={(val) => onFieldChange(fieldName, val)}
        />
      ))}
    </div>
  );
}
