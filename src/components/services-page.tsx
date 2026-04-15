"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Layers,
  Plus,
  X,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Assumption = {
  id: string;
  title: string;
};

type AssumptionLink = {
  id: string;
  assumption: Assumption;
};

type ServiceLine = {
  id: string;
  name: string;
  description: string;
  type: string;
  currentPricing: string | null;
  proposedPricing: string | null;
  aiDeliveryModel: string | null;
  marketOpportunity: string | null;
  status: string;
  notes: string | null;
  assumptionLinks: AssumptionLink[];
};

const statusColors: Record<string, string> = {
  exploring: "bg-blue-100 text-blue-700",
  piloting: "bg-amber-100 text-amber-700",
  active: "bg-emerald-100 text-emerald-700",
  paused: "bg-gray-100 text-gray-600",
};

const opportunityColors: Record<string, string> = {
  small: "text-gray-500",
  medium: "text-amber-600",
  large: "text-emerald-600",
};

function ServiceCard({
  service,
  onUpdate,
  onDelete,
}: {
  service: ServiceLine;
  onUpdate: () => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);

  const updateStatus = async (status: string) => {
    await fetch(`/api/services/${service.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    onUpdate();
  };

  return (
    <div className="bg-card border border-card-border rounded-xl p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {service.type === "new" ? (
              <Sparkles className="w-4 h-4 text-accent-light" />
            ) : (
              <RefreshCw className="w-4 h-4 text-amber-400" />
            )}
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                service.type === "new"
                  ? "bg-accent/20 text-accent-light"
                  : "bg-amber-500/20 text-amber-300"
              )}
            >
              {service.type === "new" ? "New Service" : "Restructured"}
            </span>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                statusColors[service.status]
              )}
            >
              {service.status}
            </span>
          </div>
          <h3 className="font-semibold text-lg">{service.name}</h3>
        </div>
        {service.marketOpportunity && (
          <div className="text-right">
            <p className="text-xs text-muted">Market</p>
            <p
              className={cn(
                "font-bold text-sm",
                opportunityColors[service.marketOpportunity]
              )}
            >
              {service.marketOpportunity.toUpperCase()}
            </p>
          </div>
        )}
      </div>

      <p className="text-sm text-muted">{service.description}</p>

      {(service.currentPricing || service.proposedPricing) && (
        <div className="grid grid-cols-2 gap-4">
          {service.currentPricing && (
            <div className="bg-input-bg rounded-lg p-3">
              <p className="text-xs text-muted mb-1">Current Pricing</p>
              <p className="text-sm">{service.currentPricing}</p>
            </div>
          )}
          {service.proposedPricing && (
            <div className="bg-accent/5 border border-accent/10 rounded-lg p-3">
              <p className="text-xs text-accent-light mb-1">
                Proposed Pricing
              </p>
              <p className="text-sm">{service.proposedPricing}</p>
            </div>
          )}
        </div>
      )}

      {service.aiDeliveryModel && (
        <div className="bg-input-bg rounded-lg p-3">
          <p className="text-xs text-muted mb-1">AI Delivery Model</p>
          <p className="text-sm">{service.aiDeliveryModel}</p>
        </div>
      )}

      {service.assumptionLinks.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted">Depends on assumptions:</p>
          <div className="flex flex-wrap gap-1.5">
            {service.assumptionLinks.map((link) => (
              <span
                key={link.id}
                className="text-xs bg-input-bg border border-card-border rounded-full px-2.5 py-1"
              >
                {link.assumption.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {service.notes && (
        <p className="text-xs text-muted italic">{service.notes}</p>
      )}

      <div className="flex items-center gap-2 pt-2 border-t border-card-border">
        {["exploring", "piloting", "active", "paused"].map((s) => (
          <button
            key={s}
            onClick={() => updateStatus(s)}
            className={cn(
              "text-xs px-2.5 py-1 rounded-full transition-colors",
              service.status === s
                ? statusColors[s]
                : "text-muted hover:text-foreground hover:bg-hover-bg"
            )}
          >
            {s}
          </button>
        ))}
        <button
          onClick={() => onDelete(service.id)}
          className="text-xs text-red-400 hover:text-red-300 ml-auto transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function NewServiceForm({
  onClose,
  onCreated,
  assumptions,
}: {
  onClose: () => void;
  onCreated: () => void;
  assumptions: Assumption[];
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "new",
    currentPricing: "",
    proposedPricing: "",
    aiDeliveryModel: "",
    marketOpportunity: "medium",
    notes: "",
    assumptionIds: [] as string[],
  });

  const submit = async () => {
    if (!form.name.trim()) return;
    await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    onCreated();
    onClose();
  };

  const toggleAssumption = (id: string) => {
    setForm((prev) => ({
      ...prev,
      assumptionIds: prev.assumptionIds.includes(id)
        ? prev.assumptionIds.filter((a) => a !== id)
        : [...prev.assumptionIds, id],
    }));
  };

  return (
    <div className="bg-card border border-accent/30 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">New Service Line</h3>
        <button onClick={onClose} className="text-muted hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Service name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="bg-input-bg border border-card-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted"
          autoFocus
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="bg-input-bg border border-card-border rounded-lg px-3 py-2.5 text-sm"
        >
          <option value="new">New Service</option>
          <option value="restructured">Restructured Existing</option>
        </select>
      </div>

      <textarea
        placeholder="What is this service? How does it work?"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        rows={2}
        className="w-full bg-input-bg border border-card-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted resize-none"
      />

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Current pricing model"
          value={form.currentPricing}
          onChange={(e) => setForm({ ...form, currentPricing: e.target.value })}
          className="bg-input-bg border border-card-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted"
        />
        <input
          type="text"
          placeholder="Proposed pricing model"
          value={form.proposedPricing}
          onChange={(e) =>
            setForm({ ...form, proposedPricing: e.target.value })
          }
          className="bg-input-bg border border-card-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted"
        />
      </div>

      <input
        type="text"
        placeholder="How does AI change the delivery?"
        value={form.aiDeliveryModel}
        onChange={(e) => setForm({ ...form, aiDeliveryModel: e.target.value })}
        className="w-full bg-input-bg border border-card-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted"
      />

      <div className="grid md:grid-cols-2 gap-4">
        <select
          value={form.marketOpportunity}
          onChange={(e) =>
            setForm({ ...form, marketOpportunity: e.target.value })
          }
          className="bg-input-bg border border-card-border rounded-lg px-3 py-2.5 text-sm"
        >
          <option value="small">Small Market</option>
          <option value="medium">Medium Market</option>
          <option value="large">Large Market</option>
        </select>
        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={1}
          className="bg-input-bg border border-card-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted resize-none"
        />
      </div>

      {assumptions.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Which assumptions must hold?
          </p>
          <div className="flex flex-wrap gap-1.5">
            {assumptions.map((a) => (
              <button
                key={a.id}
                onClick={() => toggleAssumption(a.id)}
                className={cn(
                  "text-xs px-2.5 py-1 rounded-full border transition-colors",
                  form.assumptionIds.includes(a.id)
                    ? "bg-accent/20 border-accent/40 text-accent-light"
                    : "border-card-border text-muted hover:text-foreground"
                )}
              >
                {a.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={submit}
        className="bg-accent hover:bg-accent-light text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
      >
        Add Service Line
      </button>
    </div>
  );
}

export function ServicesPage() {
  const [services, setServices] = useState<ServiceLine[]>([]);
  const [assumptions, setAssumptions] = useState<Assumption[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const [servRes, assRes] = await Promise.all([
      fetch("/api/services"),
      fetch("/api/assumptions"),
    ]);
    setServices(await servRes.json());
    setAssumptions(await assRes.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    fetchData();
  };

  const filtered =
    filterType === "all"
      ? services
      : services.filter((s) => s.type === filterType);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Layers className="w-8 h-8 text-accent-light" />
            Service Lines
          </h1>
          <p className="text-muted mt-2">
            New opportunities and restructured existing services. Each one
            linked to the assumptions that need to hold.
          </p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="bg-accent hover:bg-accent-light text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Service
        </button>
      </div>

      <div className="flex gap-2">
        {[
          { value: "all", label: "All" },
          { value: "new", label: "New Services" },
          { value: "restructured", label: "Restructured" },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilterType(f.value)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm transition-colors",
              filterType === f.value
                ? "bg-accent/20 text-accent-light"
                : "text-muted hover:text-foreground hover:bg-hover-bg"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {showNew && (
        <NewServiceForm
          onClose={() => setShowNew(false)}
          onCreated={fetchData}
          assumptions={assumptions}
        />
      )}

      {loading ? (
        <div className="text-center py-12 text-muted">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted">
          No service lines yet. Add one to start exploring revenue
          opportunities.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              onUpdate={fetchData}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
