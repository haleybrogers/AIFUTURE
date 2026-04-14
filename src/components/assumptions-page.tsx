"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Lightbulb,
  Plus,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Shield,
  ShieldAlert,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Evidence = {
  id: string;
  content: string;
  type: string;
  sourceUrl: string | null;
  createdAt: string;
};

type Comment = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
};

type Assumption = {
  id: string;
  title: string;
  description: string;
  category: string;
  convictionScore: number;
  evidence: Evidence[];
  comments: Comment[];
  createdAt: string;
};

const categories = [
  { value: "all", label: "All" },
  { value: "market", label: "Market" },
  { value: "technology", label: "Technology" },
  { value: "org_structure", label: "Org Structure" },
  { value: "pricing", label: "Pricing" },
  { value: "other", label: "Other" },
];

const categoryColors: Record<string, string> = {
  market: "bg-emerald-500/20 text-emerald-300",
  technology: "bg-cyan-500/20 text-cyan-300",
  org_structure: "bg-amber-500/20 text-amber-300",
  pricing: "bg-violet-500/20 text-violet-300",
  other: "bg-gray-500/20 text-gray-300",
};

function ConvictionBadge({ score }: { score: number }) {
  const color =
    score >= 75
      ? "text-emerald-400"
      : score >= 40
      ? "text-amber-400"
      : "text-red-400";
  return (
    <span className={cn("font-mono font-bold text-lg", color)}>{score}%</span>
  );
}

function AssumptionCard({
  assumption,
  onUpdate,
  onDelete,
}: {
  assumption: Assumption;
  onUpdate: (id: string, data: Partial<Assumption>) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [newEvidence, setNewEvidence] = useState("");
  const [evidenceType, setEvidenceType] = useState<"for" | "against">("for");
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");

  const addEvidence = async () => {
    if (!newEvidence.trim()) return;
    await fetch(`/api/assumptions/${assumption.id}/evidence`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newEvidence, type: evidenceType }),
    });
    setNewEvidence("");
    onUpdate(assumption.id, {});
  };

  const addComment = async () => {
    if (!newComment.trim() || !commentAuthor.trim()) return;
    await fetch(`/api/assumptions/${assumption.id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment, author: commentAuthor }),
    });
    setNewComment("");
    onUpdate(assumption.id, {});
  };

  const updateConviction = async (score: number) => {
    await fetch(`/api/assumptions/${assumption.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ convictionScore: score }),
    });
    onUpdate(assumption.id, { convictionScore: score });
  };

  const forEvidence = assumption.evidence.filter((e) => e.type === "for");
  const againstEvidence = assumption.evidence.filter(
    (e) => e.type === "against"
  );

  return (
    <div className="bg-card border border-card-border rounded-xl overflow-hidden">
      <div
        className="p-5 cursor-pointer hover:bg-white/[0.02] transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  categoryColors[assumption.category] || categoryColors.other
                )}
              >
                {assumption.category.replace("_", " ")}
              </span>
              <span className="text-xs text-muted">
                {assumption.comments.length} comments
              </span>
            </div>
            <h3 className="font-semibold text-lg">{assumption.title}</h3>
            <p className="text-sm text-muted line-clamp-2">
              {assumption.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ConvictionBadge score={assumption.convictionScore} />
            {expanded ? (
              <ChevronUp className="w-5 h-5 text-muted" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted" />
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-card-border p-5 space-y-6">
          {/* Conviction Slider */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Conviction Level</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={100}
                value={assumption.convictionScore}
                onChange={(e) => updateConviction(Number(e.target.value))}
                className="flex-1"
                onClick={(e) => e.stopPropagation()}
              />
              <ConvictionBadge score={assumption.convictionScore} />
            </div>
            <div className="flex justify-between text-xs text-muted">
              <span>Wild guess</span>
              <span>We&apos;d bet the company</span>
            </div>
          </div>

          {/* Evidence */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                <Shield className="w-4 h-4" />
                Evidence For ({forEvidence.length})
              </div>
              {forEvidence.map((e) => (
                <div
                  key={e.id}
                  className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3 text-sm"
                >
                  {e.content}
                  {e.sourceUrl && (
                    <a
                      href={e.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-accent-light mt-1"
                    >
                      Source <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-red-400">
                <ShieldAlert className="w-4 h-4" />
                Evidence Against ({againstEvidence.length})
              </div>
              {againstEvidence.map((e) => (
                <div
                  key={e.id}
                  className="bg-red-500/5 border border-red-500/10 rounded-lg p-3 text-sm"
                >
                  {e.content}
                  {e.sourceUrl && (
                    <a
                      href={e.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-accent-light mt-1"
                    >
                      Source <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add Evidence */}
          <div className="flex gap-2">
            <select
              value={evidenceType}
              onChange={(e) =>
                setEvidenceType(e.target.value as "for" | "against")
              }
              className="bg-white/5 border border-card-border rounded-lg px-3 py-2 text-sm"
            >
              <option value="for">For</option>
              <option value="against">Against</option>
            </select>
            <input
              type="text"
              placeholder="Add evidence..."
              value={newEvidence}
              onChange={(e) => setNewEvidence(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addEvidence()}
              className="flex-1 bg-white/5 border border-card-border rounded-lg px-3 py-2 text-sm placeholder:text-muted"
            />
            <button
              onClick={addEvidence}
              className="bg-accent hover:bg-accent-light px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Add
            </button>
          </div>

          {/* Comments */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <MessageSquare className="w-4 h-4" />
              Discussion ({assumption.comments.length})
            </div>
            {assumption.comments.map((c) => (
              <div
                key={c.id}
                className="bg-white/5 rounded-lg p-3 space-y-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{c.author}</span>
                  <span className="text-xs text-muted">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted">{c.content}</p>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Your name"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="w-32 bg-white/5 border border-card-border rounded-lg px-3 py-2 text-sm placeholder:text-muted"
              />
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addComment()}
                className="flex-1 bg-white/5 border border-card-border rounded-lg px-3 py-2 text-sm placeholder:text-muted"
              />
              <button
                onClick={addComment}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Post
              </button>
            </div>
          </div>

          {/* Delete */}
          <div className="flex justify-end">
            <button
              onClick={() => onDelete(assumption.id)}
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              Delete assumption
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function NewAssumptionForm({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("market");

  const submit = async () => {
    if (!title.trim()) return;
    await fetch("/api/assumptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, category }),
    });
    onCreated();
    onClose();
  };

  return (
    <div className="bg-card border border-accent/30 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">New Assumption</h3>
        <button onClick={onClose} className="text-muted hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>
      <input
        type="text"
        placeholder="What do you believe will be true?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-white/5 border border-card-border rounded-lg px-4 py-3 text-base placeholder:text-muted"
        autoFocus
      />
      <textarea
        placeholder="Why? What does it mean for us?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className="w-full bg-white/5 border border-card-border rounded-lg px-4 py-3 text-sm placeholder:text-muted resize-none"
      />
      <div className="flex items-center gap-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white/5 border border-card-border rounded-lg px-3 py-2 text-sm"
        >
          {categories.slice(1).map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <button
          onClick={submit}
          className="bg-accent hover:bg-accent-light px-6 py-2 rounded-lg text-sm font-medium transition-colors ml-auto"
        >
          Add Assumption
        </button>
      </div>
    </div>
  );
}

export function AssumptionsPage() {
  const [assumptions, setAssumptions] = useState<Assumption[]>([]);
  const [filter, setFilter] = useState("all");
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAssumptions = useCallback(async () => {
    const res = await fetch("/api/assumptions");
    const data = await res.json();
    setAssumptions(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAssumptions();
  }, [fetchAssumptions]);

  const handleUpdate = () => fetchAssumptions();

  const handleDelete = async (id: string) => {
    await fetch(`/api/assumptions/${id}`, { method: "DELETE" });
    fetchAssumptions();
  };

  const filtered =
    filter === "all"
      ? assumptions
      : assumptions.filter((a) => a.category === filter);

  const avgConviction =
    assumptions.length > 0
      ? Math.round(
          assumptions.reduce((sum, a) => sum + a.convictionScore, 0) /
            assumptions.length
        )
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-accent-light" />
            The Future We Believe In
          </h1>
          <p className="text-muted mt-2">
            Our shared assumptions about where things are heading. Rate your
            conviction, add evidence, discuss.
          </p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="bg-accent hover:bg-accent-light px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Assumption
        </button>
      </div>

      {/* Stats Bar */}
      <div className="flex gap-4">
        <div className="bg-card border border-card-border rounded-lg px-4 py-3 flex items-center gap-3">
          <span className="text-sm text-muted">Total</span>
          <span className="font-bold text-lg">{assumptions.length}</span>
        </div>
        <div className="bg-card border border-card-border rounded-lg px-4 py-3 flex items-center gap-3">
          <span className="text-sm text-muted">Avg Conviction</span>
          <ConvictionBadge score={avgConviction} />
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setFilter(c.value)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm transition-colors",
              filter === c.value
                ? "bg-accent/20 text-accent-light"
                : "text-muted hover:text-foreground hover:bg-white/5"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {showNew && (
        <NewAssumptionForm
          onClose={() => setShowNew(false)}
          onCreated={fetchAssumptions}
        />
      )}

      {/* Assumption Cards */}
      {loading ? (
        <div className="text-center py-12 text-muted">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted">
          {assumptions.length === 0
            ? "No assumptions yet. Add one to start mapping the future."
            : "No assumptions in this category."}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((a) => (
            <AssumptionCard
              key={a.id}
              assumption={a}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
