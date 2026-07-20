import { Entity } from "./Entity.js";

export abstract class AggregateRoot<TId> extends Entity<TId> {
  private readonly domainEvents: unknown[] = [];

  protected addDomainEvent(event: unknown): void {
    this.domainEvents.push(event);
  }

  pullDomainEvents(): unknown[] {
    const events = [...this.domainEvents];
    this.domainEvents.length = 0;
    return events;
  }
}
