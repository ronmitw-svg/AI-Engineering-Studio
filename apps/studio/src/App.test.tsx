import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { AdrStatus, Priority, RequirementStatus, RequirementType } from '@aes/core'
import type { ProjectSnapshot, ProjectSummary, ProjectValidationReport } from '@aes/core'
import App from './App.js'

const summary: ProjectSummary = {
  id: 'demo', name: 'Demo project', requirementCount: 1, workOrderCount: 0, reviewCount: 0, releaseCount: 0,
}

const project: ProjectSnapshot = {
  schemaVersion: 1, id: 'demo', name: 'Demo project',
  requirements: [{ id: 'req-1', title: 'Traceability', description: 'Track work.', type: RequirementType.Functional, priority: Priority.Medium,
    acceptanceCriteria: ['Traced'], source: 'Charter', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z', status: RequirementStatus.Draft }],
  workOrders: [],
  adrs: [{ id: 'adr-1', title: 'Use core', context: 'c', decision: 'd', consequences: 'e', requirementIds: ['req-1'], proposedBy: 'architect', status: AdrStatus.Proposed, createdAt: '2026-01-01T00:00:00.000Z' }],
  stakeholders: [], reviews: [], releases: [],
}

const traceability: ProjectValidationReport = {
  projectId: 'demo',
  requirementTraceability: [{ requirementId: 'req-1', workOrderIds: [], adrIds: ['adr-1'], reviewedWorkOrderIds: [], releaseIds: [] }],
  unlinkedRequirementIds: ['req-1'], requirementsMissingAdr: [], requirementsMissingApprovedReview: ['req-1'], isValid: false,
}

function mockFetchOnce(url: string, body: unknown, status = 200) {
  return { url, response: new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } }) }
}

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('loads the project list and the first project\'s detail, including its traceability findings', async () => {
    const responses = [
      mockFetchOnce('/api/projects', [summary]),
      mockFetchOnce('/api/projects/demo', { project, traceability }),
    ]
    vi.mocked(fetch).mockImplementation(async (input) => {
      const url = typeof input === 'string' ? input : input.toString()
      const match = responses.find((entry) => url === entry.url)
      if (!match) throw new Error(`Unexpected fetch: ${url}`)
      return match.response.clone()
    })

    render(<App />)

    expect(await screen.findByText('Demo project', { selector: 'strong' })).toBeInTheDocument()
    expect((await screen.findAllByText('req-1')).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('adr-1')).toBeInTheDocument()
    expect(screen.getByText('Unlinked requirements: req-1')).toBeInTheDocument()
    expect(screen.getByText('Requirements without an approved review: req-1')).toBeInTheDocument()
  })

  it('shows an empty-state message when the workspace has no projects', async () => {
    vi.mocked(fetch).mockImplementation(async () => mockFetchOnce('/api/projects', []).response.clone())

    render(<App />)

    expect(await screen.findByText(/No projects in this workspace yet/)).toBeInTheDocument()
  })

  it('surfaces a fetch failure instead of hanging on "Loading"', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('network down'))

    render(<App />)

    await waitFor(() => expect(screen.getByText('network down')).toBeInTheDocument())
  })
})
