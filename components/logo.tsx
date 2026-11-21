type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 260 224"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className ? `text-white ${className}` : "text-white"}
    >
      <path d="M0 0H58L130 70L202 0H260V54L142 112L260 170V224H202L130 154L58 224H0V170L118 112L0 54V0Z" />
    </svg>
  );
}
