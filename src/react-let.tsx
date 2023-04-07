export type LetProps<P> = {
  children: (props: Pick<P, Exclude<keyof P, "children">>) => JSX.Element;
} & P;

export function Let<P extends Record<string, unknown>>({ children, ...ownProps }: LetProps<P>): JSX.Element {
  return children(ownProps);
}
