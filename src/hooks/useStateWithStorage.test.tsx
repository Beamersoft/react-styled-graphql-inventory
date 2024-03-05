import { 
  renderHook,
  act
} from '@testing-library/react-hooks';
import useStateWithStorage from './useStateWithStorage';

const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = String(value);
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('useStateWithStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('should use default value when localStorage is empty', () => {
    const { result } = renderHook(() => useStateWithStorage('testKey', 'defaultValue'));
  
    expect(result.current[0]).toBe('defaultValue');
  });
  
  test('should retrieve stored value from localStorage', () => {
    window.localStorage.setItem('testKey', JSON.stringify('storedValue'));
    const { result } = renderHook(() => useStateWithStorage('testKey', 'defaultValue'));
  
    expect(result.current[0]).toBe('storedValue');
  });
  
  test('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useStateWithStorage('testKey', 'defaultValue'));
  
    act(() => {
      result.current[1]('newValue');
    });
  
    expect(window.localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
    expect(result.current[0]).toBe('newValue');
  });
});
