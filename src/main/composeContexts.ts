import {Component, Context, createElement, FC, Fragment, ReactElement, ReactNode} from 'react';

export type ContextProtocol<T> = [Context<T>, T] | [FC<T>, T] | [new (props: T, context?: any) => Component<T, any>, T];

export type ContextProtocolArray<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z> = [
  ContextProtocol<A>?,
  ContextProtocol<B>?,
  ContextProtocol<C>?,
  ContextProtocol<D>?,
  ContextProtocol<E>?,
  ContextProtocol<F>?,
  ContextProtocol<G>?,
  ContextProtocol<H>?,
  ContextProtocol<I>?,
  ContextProtocol<J>?,
  ContextProtocol<K>?,
  ContextProtocol<L>?,
  ContextProtocol<M>?,
  ContextProtocol<N>?,
  ContextProtocol<O>?,
  ContextProtocol<P>?,
  ContextProtocol<Q>?,
  ContextProtocol<R>?,
  ContextProtocol<S>?,
  ContextProtocol<T>?,
  ContextProtocol<U>?,
  ContextProtocol<V>?,
  ContextProtocol<W>?,
  ContextProtocol<X>?,
  ContextProtocol<Y>?,
  ContextProtocol<Z>?,
  ...Array<ContextProtocol<any>>
];

/**
 * Wraps node in context providers.
 *
 * @param protocols The list of context-value pairs to wrap node with.
 * @param node The node to wrap.
 *
 * @returns The element that renders all provided contexts.
 */
export function composeContexts<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z>(protocols: ContextProtocolArray<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z>, node: ReactNode): ReactElement;

export function composeContexts(protocols: Array<ContextProtocol<any> | undefined>, node: ReactNode): ReactElement {
  for (let i = protocols.length - 1; i >= 0; --i) {
    const protocol = protocols[i];

    if (protocol) {
      const [component, value] = protocol;
      node = typeof component === 'function' ? createElement(component, value, node) : createElement(component.Provider, {value}, node);
    }
  }
  return createElement(Fragment, null, node);
}
