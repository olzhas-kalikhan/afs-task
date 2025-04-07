import icons from "./icons";
export type IconName = keyof typeof icons;
export type SVGProps = Omit<
  React.ButtonHTMLAttributes<HTMLOrSVGElement>,
  "children"
> & {
  size?: number;
  iconName: IconName;
};

export default function SvgIcon({ iconName, ...props }: SVGProps) {
  const Icon = icons[iconName];
  return (
    <svg
      viewBox={`0 0 20 20`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Icon />
    </svg>
  );
}
