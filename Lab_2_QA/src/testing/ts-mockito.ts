/*
 * Minimal utilities inspired by ts-mockito for educational purposes when the
 * real package cannot be installed in restricted environments. The helpers
 * implemented here provide only the subset of functionality required by the
 * integration tests of this laboratory: creating mocks, defining behaviour and
 * resetting their configuration.
 */

type Invocation = {
  mock: object;
  property: string | symbol;
};

type Stub = (...args: Array<unknown>) => unknown;

const mockRegistry = new WeakMap<object, Map<string | symbol, Stub>>();
let lastInvocation: Invocation | null = null;

function ensureRegistry(target: object): Map<string | symbol, Stub> {
  let stubs = mockRegistry.get(target);
  if (!stubs) {
    stubs = new Map<string | symbol, Stub>();
    mockRegistry.set(target, stubs);
  }
  return stubs;
}

function createProxy(stubs: Map<string | symbol, Stub>, recordInvocation: boolean): object {
  return new Proxy(
    {},
    {
      get(_target, property: string | symbol) {
        if (property === '__mockStubs__') {
          return stubs;
        }

        return (...args: Array<unknown>) => {
          if (recordInvocation) {
            lastInvocation = { mock: stubs, property };
          }

          const stub = stubs.get(property);
          if (stub) {
            return stub(...args);
          }
          return undefined;
        };
      }
    }
  );
}

export function mock<T extends object>(): T {
  const stubs = ensureRegistry({});
  const proxy = createProxy(stubs, true);
  mockRegistry.set(proxy, stubs);
  return proxy as T;
}

export function instance<T extends object>(mockObject: T): T {
  const stubs = ensureRegistry(mockObject as unknown as object);
  return createProxy(stubs, false) as T;
}

export function when(_invocationResult: unknown) {
  const invocation = lastInvocation;
  lastInvocation = null;
  if (!invocation) {
    throw new Error('No invocation recorded for stubbing.');
  }

  const stubs = invocation.mock as Map<string | symbol, Stub>;

  return {
    thenReturn(value: unknown) {
      stubs.set(invocation.property, () => value);
    },
    thenCall(fn: Stub) {
      stubs.set(invocation.property, fn);
    }
  };
}

export function reset(mockObject: object): void {
  const stubs = mockRegistry.get(mockObject);
  if (stubs) {
    stubs.clear();
  }
}
