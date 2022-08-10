import Link from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

type HeaderLinkProps = {
  href: string;
  activeClassName: string;
  children: ReactElement;
};

export function ActiveLink({
  activeClassName,
  children,
  ...rest
}: HeaderLinkProps) {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? activeClassName : "";

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className,
      })}
    </Link>
  );
}
