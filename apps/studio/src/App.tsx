import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { ProjectSnapshot, ProjectSummary, ProjectValidationReport } from '@aes/core'
import './App.css'

interface ProjectDetail {
  readonly project: ProjectSnapshot
  readonly traceability: ProjectValidationReport
}

function App() {
  const [projects, setProjects] = useState<ProjectSummary[] | null>(null)
  const [projectsError, setProjectsError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [detail, setDetail] = useState<ProjectDetail | null>(null)
  const [detailError, setDetailError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/projects')
      .then((response) => response.json())
      .then((summaries: ProjectSummary[]) => {
        if (cancelled) return
        setProjects(summaries)
        setSelectedId((current) => current ?? summaries[0]?.id ?? null)
      })
      .catch((error: unknown) => {
        if (!cancelled) setProjectsError(error instanceof Error ? error.message : 'Failed to load projects.')
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!selectedId) {
      setDetail(null)
      return
    }
    let cancelled = false
    setDetail(null)
    setDetailError(null)
    fetch(`/api/projects/${encodeURIComponent(selectedId)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error((await response.json()).error ?? `Request failed with status ${response.status}.`)
        return response.json() as Promise<ProjectDetail>
      })
      .then((loaded) => {
        if (!cancelled) setDetail(loaded)
      })
      .catch((error: unknown) => {
        if (!cancelled) setDetailError(error instanceof Error ? error.message : 'Failed to load project.')
      })
    return () => {
      cancelled = true
    }
  }, [selectedId])

  return (
    <div id="dashboard">
      <aside id="project-list">
        <h1>AI Engineering Studio</h1>
        {projectsError && <p className="error">{projectsError}</p>}
        {projects === null && !projectsError && <p>Loading projects…</p>}
        {projects?.length === 0 && <p>No projects in this workspace yet. Run `aes init` to create one.</p>}
        <ul>
          {projects?.map((summary) => (
            <li key={summary.id}>
              <button
                type="button"
                className={summary.id === selectedId ? 'selected' : ''}
                onClick={() => setSelectedId(summary.id)}
              >
                <strong>{summary.name}</strong>
                <span className="counts">
                  {summary.requirementCount} requirements · {summary.workOrderCount} work orders · {summary.reviewCount} reviews · {summary.releaseCount} releases
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main id="project-detail">
        {detailError && <p className="error">{detailError}</p>}
        {selectedId && !detail && !detailError && <p>Loading…</p>}
        {detail && <ProjectDetailView detail={detail} />}
      </main>
    </div>
  )
}

function ProjectDetailView({ detail }: { detail: ProjectDetail }) {
  const { project, traceability } = detail

  return (
    <>
      <h2>{project.name}</h2>

      <Section title="Requirements" empty={!project.requirements.length}>
        <table>
          <thead>
            <tr><th>ID</th><th>Title</th><th>Status</th></tr>
          </thead>
          <tbody>
            {project.requirements.map((requirement) => (
              <tr key={requirement.id}>
                <td>{requirement.id}</td>
                <td>{requirement.title}</td>
                <td>{requirement.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Work Orders" empty={!project.workOrders.length}>
        <table>
          <thead>
            <tr><th>ID</th><th>Title</th><th>Status</th></tr>
          </thead>
          <tbody>
            {project.workOrders.map((workOrder) => (
              <tr key={workOrder.id}>
                <td>{workOrder.id}</td>
                <td>{workOrder.title}</td>
                <td>{workOrder.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Architecture Decisions" empty={!project.adrs.length}>
        <table>
          <thead>
            <tr><th>ID</th><th>Title</th><th>Status</th><th>Requirements</th></tr>
          </thead>
          <tbody>
            {project.adrs.map((adr) => (
              <tr key={adr.id}>
                <td>{adr.id}</td>
                <td>{adr.title}</td>
                <td>{adr.status}</td>
                <td>{adr.requirementIds.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Reviews" empty={!project.reviews.length}>
        <table>
          <thead>
            <tr><th>ID</th><th>Reviewer</th><th>Target</th><th>Status</th></tr>
          </thead>
          <tbody>
            {project.reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.reviewer}</td>
                <td>{review.target}</td>
                <td>{review.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Releases" empty={!project.releases.length}>
        <table>
          <thead>
            <tr><th>ID</th><th>Version</th><th>Proposed by</th><th>Status</th></tr>
          </thead>
          <tbody>
            {project.releases.map((release) => (
              <tr key={release.id}>
                <td>{release.id}</td>
                <td>{release.version}</td>
                <td>{release.proposedBy}</td>
                <td>{release.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Traceability" empty={false}>
        <p className={traceability.isValid ? 'ok' : 'error'}>
          {traceability.isValid ? 'Every requirement has at least one work order.' : `Unlinked requirements: ${traceability.unlinkedRequirementIds.join(', ')}`}
        </p>
        {traceability.requirementsMissingAdr.length > 0 && (
          <p className="warning">Requirements without an ADR: {traceability.requirementsMissingAdr.join(', ')}</p>
        )}
        {traceability.requirementsMissingApprovedReview.length > 0 && (
          <p className="warning">Requirements without an approved review: {traceability.requirementsMissingApprovedReview.join(', ')}</p>
        )}
      </Section>
    </>
  )
}

function Section({ title, empty, children }: { title: string; empty: boolean; children: ReactNode }) {
  return (
    <section className="detail-section">
      <h3>{title}</h3>
      {empty ? <p className="muted">None yet.</p> : children}
    </section>
  )
}

export default App
