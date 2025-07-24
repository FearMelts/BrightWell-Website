import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {
  AssetPreloader,
  AssetType,
  AssetPriority,
  LoadingStrategy,
  useAssetPreloader,
  OptimizedImage,
} from './assetOptimization';

describe('AssetPreloader', () => {
  let preloader: AssetPreloader;

  beforeEach(() => {
    preloader = new AssetPreloader();
    // Mock document and window for asset loading
    (global as any).document = {
      createElement: jest.fn((tag: string) => {
        if (tag === 'img' || tag === 'image') {
          return {
            set src(val: string) {
              setTimeout(() => {
                if (val.includes('fail')) {
                  this.onerror && this.onerror(new Error('fail'));
                } else {
                  this.onload && this.onload();
                }
              }, 0);
            },
            set crossOrigin(_: string) {},
            onload: null,
            onerror: null,
          };
        }
        if (tag === 'link') {
          return {
            rel: '',
            as: '',
            href: '',
            type: '',
            crossOrigin: '',
            onload: null,
            onerror: null,
            set src(val: string) {
              setTimeout(() => {
                this.onload && this.onload();
              }, 0);
            },
          };
        }
        if (tag === 'script') {
          return {
            src: '',
            crossOrigin: '',
            onload: null,
            onerror: null,
            set src(val: string) {
              setTimeout(() => {
                this.onload && this.onload();
              }, 0);
            },
          };
        }
        if (tag === 'video' || tag === 'audio') {
          return {
            src: '',
            crossOrigin: '',
            preload: '',
            oncanplaythrough: null,
            onerror: null,
            set src(val: string) {
              setTimeout(() => {
                if (val.includes('fail')) {
                  this.onerror && this.onerror(new Error('fail'));
                } else {
                  this.oncanplaythrough && this.oncanplaythrough();
                }
              }, 0);
            },
          };
        }
        return {};
      }),
      head: {
        appendChild: jest.fn(),
      },
      fonts: true,
    };
    (global as any).window = {
      addEventListener: jest.fn(),
      requestAnimationFrame: (cb: any) => setTimeout(cb, 0),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('preloads an image asset successfully', async () => {
    await expect(
      preloader.preload({
        src: 'test.jpg',
        type: AssetType.IMAGE,
        priority: AssetPriority.HIGH,
        strategy: LoadingStrategy.EAGER,
      })
    ).resolves.toBeDefined();
    expect(preloader.isLoaded('test.jpg')).toBe(true);
    expect(preloader.hasFailed('test.jpg')).toBe(false);
  });

  it('handles asset load failure', async () => {
    await expect(
      preloader.preload({
        src: 'fail.jpg',
        type: AssetType.IMAGE,
        priority: AssetPriority.HIGH,
        strategy: LoadingStrategy.EAGER,
      })
    ).rejects.toThrow();
    expect(preloader.isLoaded('fail.jpg')).toBe(false);
    expect(preloader.hasFailed('fail.jpg')).toBe(true);
  });

  it('returns cache stats', async () => {
    await preloader.preload({
      src: 'test2.jpg',
      type: AssetType.IMAGE,
      priority: AssetPriority.HIGH,
      strategy: LoadingStrategy.EAGER,
    });
    const stats = preloader.getCacheStats();
    expect(stats.loaded).toBeGreaterThanOrEqual(1);
    expect(typeof stats.cached).toBe('number');
    expect(typeof stats.failed).toBe('number');
  });
});

describe('useAssetPreloader', () => {
  function TestComponent({ src }: { src: string }) {
    const { preload, isLoaded, hasFailed, stats } = useAssetPreloader();
    React.useEffect(() => {
      preload({
        src,
        type: AssetType.IMAGE,
        priority: AssetPriority.HIGH,
        strategy: LoadingStrategy.EAGER,
      });
    }, [src, preload]);
    return (
      <div>
        <span data-testid="loaded">{isLoaded(src) ? 'yes' : 'no'}</span>
        <span data-testid="failed">{hasFailed(src) ? 'yes' : 'no'}</span>
        <span data-testid="stats">{stats.loaded}</span>
      </div>
    );
  }

  it('preloads and updates stats', async () => {
    render(<TestComponent src="test3.jpg" />);
    await waitFor(() => expect(screen.getByTestId('loaded').textContent).toBe('yes'));
    expect(screen.getByTestId('failed').textContent).toBe('no');
    expect(Number(screen.getByTestId('stats').textContent)).toBeGreaterThanOrEqual(1);
  });
});

describe('OptimizedImage', () => {
  it('renders and calls onLoad', async () => {
    const handleLoad = jest.fn();
    render(
      <OptimizedImage
        src="test4.jpg"
        alt="desc"
        onLoad={handleLoad}
        strategy={LoadingStrategy.EAGER}
        priority={AssetPriority.CRITICAL}
      />
    );
    await waitFor(() => expect(handleLoad).toHaveBeenCalled());
    expect(screen.getByAltText('desc')).toBeInTheDocument();
  });

  it('renders error fallback on error', async () => {
    const handleError = jest.fn();
    render(
      <OptimizedImage
        src="fail.jpg"
        alt="desc"
        onError={handleError}
        strategy={LoadingStrategy.EAGER}
        priority={AssetPriority.CRITICAL}
      />
    );
    await waitFor(() => expect(handleError).toHaveBeenCalled());
    expect(screen.getByText(/Failed to load image/i)).toBeInTheDocument();
  });
});

// ...additional tests for other asset types and edge cases can be added here...
