import {render} from '@testing-library/react';
import {composeContexts} from '../main';
import {Component, createContext, createElement, FC, useContext} from 'react';

describe('composeContexts', () => {

  test('composes contexts', () => {
    const capture = jest.fn();

    const Context1 = createContext('A');
    const Context2 = createContext(123);

    const ConsumerComponent = () => {
      const value1 = useContext(Context1);
      const value2 = useContext(Context2);

      capture(value1, value2);
      return null;
    };

    render(composeContexts([
      [Context1, 'B'],
      [Context2, 456],
    ], createElement(ConsumerComponent)));

    expect(capture).toHaveBeenCalledWith('B', 456);
  });

  test('composes function components', () => {
    const component2Capture = jest.fn();
    const consumerComponentCapture = jest.fn();

    const Context1 = createContext('A');
    const Component1: FC<{ foo: string }> = (props) => {
      return createElement(Context1.Provider, {value: props.foo}, props.children);
    };

    const Context2 = createContext(123);
    const Component2: FC<{ bar: number }> = (props) => {
      component2Capture(useContext(Context1));
      return createElement(Context2.Provider, {value: props.bar}, props.children);
    };

    const ConsumerComponent = () => {
      const value1 = useContext(Context1);
      const value2 = useContext(Context2);

      consumerComponentCapture(value1, value2);
      return null;
    };

    render(composeContexts([
      [Component1, {foo: 'B'}],
      [Component2, {bar: 456}],
    ], createElement(ConsumerComponent)));

    expect(component2Capture).toHaveBeenCalledWith('B');
    expect(consumerComponentCapture).toHaveBeenCalledWith('B', 456);
  });

  test('composes classic components', () => {
    const consumerComponentCapture = jest.fn();

    const Context1 = createContext('A');

    class Component1 extends Component<{ foo: string }> {

      public render() {
        return createElement(Context1.Provider, {value: this.props.foo}, this.props.children);
      }
    }

    const Context2 = createContext(123);

    class Component2 extends Component<{ bar: number }> {

      public render() {
        return createElement(Context2.Provider, {value: this.props.bar}, this.props.children);
      }
    }

    const ConsumerComponent = () => {
      const value1 = useContext(Context1);
      const value2 = useContext(Context2);

      consumerComponentCapture(value1, value2);
      return null;
    };

    render(composeContexts([
      [Component1, {foo: 'B'}],
      [Component2, {bar: 456}],
    ], createElement(ConsumerComponent)));

    expect(consumerComponentCapture).toHaveBeenCalledWith('B', 456);
  });
});
