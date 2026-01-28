import { Input, Select, Option, Button } from "@material-tailwind/react";

const Filters = ({
  filters,
  onChange,
  onReset,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
      <Input
        label="Search Policy / Holder"
        value={filters.search}
        onChange={(e) => onChange("search", e.target.value)}
      />

      <Select
        label="Status"
        value={filters.status}
        onChange={(val) => onChange("status", val)}
      >
        <Option value="">All</Option>
        <Option value="Active">Active</Option>
        <Option value="Pending">Pending</Option>
        <Option value="Expired">Expired</Option>
      </Select>

      <Input
        type="date"
        label="From"
        value={filters.from}
        onChange={(e) => onChange("from", e.target.value)}
      />

      <Input
        type="date"
        label="To"
        value={filters.to}
        onChange={(e) => onChange("to", e.target.value)}
      />

      <Button variant="outlined" color="red" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
};

export default Filters;
