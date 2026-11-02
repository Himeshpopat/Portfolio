import { StrictMode } from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { OpeningSequence } from '../src/components/OpeningSequence'
import { ProjectScreenshotCarousel } from '../src/components/cards/ProjectScreenshotCarousel'
import { ProjectsSection } from '../src/sections/ProjectsSection'
import { PROJECTS } from '../src/data/projectsData'
import { MusicPlayer } from '../src/components/common/MusicPlayer'
import { Nav } from '../src/components/common/Nav'

describe('opening lifecycle', () => {
  it('fully unmounts after both phases under StrictMode and releases content', () => {
    vi.useFakeTimers()
    render(<StrictMode><OpeningSequence /><div id="portfolio-content"><main tabIndex={-1} /></div></StrictMode>)
    const content = document.getElementById('portfolio-content')!
    expect(content.inert).toBe(true)
    act(() => vi.advanceTimersByTime(2280))
    expect(screen.getByRole('dialog').getAttribute('data-phase')).toBe('exiting')
    act(() => vi.advanceTimersByTime(1080))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(content.inert).toBe(false)
    expect(document.activeElement?.tagName).toBe('MAIN')
  })
  it('supports Escape and keeps keyboard focus within the intro while exiting', () => {
    vi.useFakeTimers()
    render(<OpeningSequence />)
    fireEvent.keyDown(window, { key: 'Escape' })
    fireEvent.keyDown(window, { key: 'Tab' })
    expect(document.activeElement).toBe(screen.getByRole('button'))
    act(() => vi.advanceTimersByTime(1080))
    expect(screen.queryByRole('dialog')).toBeNull()
  })
  it('skips motion for the system preference', () => {
    vi.mocked(window.matchMedia).mockReturnValueOnce({ matches: true } as MediaQueryList)
    render(<OpeningSequence />)
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})

describe('navigation and media', () => {
  it('exposes native deep links with the correct current location', () => {
    render(<Nav active="projects" />)
    const link = screen.getByRole('link', { name: 'projects' })
    expect(link.getAttribute('href')).toBe('#projects')
    expect(link.getAttribute('aria-current')).toBe('location')
  })
  it('does not create audio before an explicit request', () => {
    localStorage.clear()
    const audio = vi.fn()
    vi.stubGlobal('Audio', audio)
    render(<MusicPlayer />)
    expect(audio).not.toHaveBeenCalled()
    vi.unstubAllGlobals()
  })
  it('invalidates a pending playback request when unmounted', async () => {
    vi.useFakeTimers()
    localStorage.clear()
    let resolvePlay!: () => void
    const pause = vi.fn()
    const audio = { play: () => new Promise<void>(resolve => { resolvePlay = resolve }), pause, volume: 0 }
    vi.stubGlobal('Audio', class { constructor() { return audio } })
    const { unmount } = render(<MusicPlayer />)
    fireEvent.click(screen.getByRole('button', { name: 'Play background music' }))
    unmount()
    await act(async () => { resolvePlay(); await Promise.resolve() })
    expect(pause).toHaveBeenCalled()
    expect(vi.getTimerCount()).toBe(0)
    expect(localStorage.getItem('himesh_portfolio_music_enabled')).toBeNull()
    vi.unstubAllGlobals()
  })
})

describe('project screenshots', () => {
  const shots = [{ url: '/one.webp', caption: 'First' }, { url: '/two.webp', caption: 'Second' }]
  it('rotates while visible but retains the selection after manual navigation and mouse leave', () => {
    vi.useFakeTimers()
    render(<ProjectScreenshotCarousel screenshots={shots} title="Project" color="#06b6d4" />)
    act(() => vi.advanceTimersByTime(4500))
    expect(screen.getByText('Second')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Next screenshot' }))
    fireEvent.mouseLeave(screen.getByRole('region'))
    act(() => vi.advanceTimersByTime(9000))
    expect(screen.getByText('First')).toBeTruthy()
  })
  it('supports arrow keys and hides inactive images from assistive technology', () => {
    render(<ProjectScreenshotCarousel screenshots={shots} title="Project" color="#06b6d4" />)
    fireEvent.keyDown(screen.getByRole('region'), { key: 'ArrowRight' })
    expect(screen.getByText('Second')).toBeTruthy()
    expect(screen.getAllByRole('img')).toHaveLength(1)
  })
  it('pauses on keyboard focus', () => {
    vi.useFakeTimers()
    render(<ProjectScreenshotCarousel screenshots={shots} title="Project" color="#06b6d4" />)
    fireEvent.focus(screen.getByRole('button', { name: 'Next screenshot' }))
    act(() => vi.advanceTimersByTime(9000))
    expect(screen.getByText('First')).toBeTruthy()
  })
  it('mounts one card per project at every breakpoint', () => {
    render(<ProjectsSection />)
    for (const project of PROJECTS) expect(screen.getAllByRole('heading', { name: project.name })).toHaveLength(1)
  })
})
