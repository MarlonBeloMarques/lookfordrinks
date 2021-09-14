const { Icons, colors } = Modules;

declare type IconProps = {
  fontFamily: keyof typeof Icons;
  name?: string;
  color: keyof typeof colors;
  size: number;
};
