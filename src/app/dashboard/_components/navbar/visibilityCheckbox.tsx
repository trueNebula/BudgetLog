import { Eye, EyeClosed } from '@phosphor-icons/react';

export default function VisibilityCheckbox({
  title,
  defaultChecked,
  changeHandler,
}: {
  title: string;
  defaultChecked: boolean;
  changeHandler: () => void;
}) {
  const id = `toggle-${title.replace(' ', '-')}`;
  return (
    <div className="section-toggle ml-8 text-xl">
      <input
        type="checkbox"
        id={id}
        className="mr-2"
        defaultChecked={defaultChecked}
        onChange={changeHandler}
      />
      <label htmlFor={id} className="flex items-center gap-2">
        <Eye className="unchecked" />
        <EyeClosed className="checked" />
        <span>{title}</span>
      </label>
    </div>
  );
}
