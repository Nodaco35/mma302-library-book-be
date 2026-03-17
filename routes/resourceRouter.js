const express = require("express");

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildFilter(query, numericFields) {
  const filter = {};
  for (const [key, rawValue] of Object.entries(query || {})) {
    if (rawValue === undefined) continue;
    if (key.startsWith("_")) continue;

    if (key.endsWith("_like")) {
      const field = key.slice(0, -5);
      if (!field) continue;
      filter[field] = { $regex: escapeRegExp(rawValue), $options: "i" };
      continue;
    }

    const value = numericFields.has(key) ? Number(rawValue) : rawValue;
    if (Number.isNaN(value)) continue;
    filter[key] = value;
  }
  return filter;
}

function buildSort(query) {
  const sortKey = query?._sort;
  if (!sortKey) return null;
  const order = String(query?._order || "asc").toLowerCase();
  return { [sortKey]: order === "desc" ? -1 : 1 };
}

async function getNextId(model) {
  const last = await model.findOne({}, { id: 1 }).sort({ id: -1 }).lean();
  return last && typeof last.id === "number" ? last.id + 1 : 1;
}

function createResourceRouter(model, options = {}) {
  const numericFields = new Set(options.numericFields || []);
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const filter = buildFilter(req.query, numericFields);
      const sort = buildSort(req.query);

      let query = model.find(filter).select("-_id");
      if (sort) query = query.sort(sort);

      const page = Number(req.query?._page);
      const limit = Number(req.query?._limit);
      if (!Number.isNaN(page) && !Number.isNaN(limit) && page > 0 && limit > 0) {
        query = query.skip((page - 1) * limit).limit(limit);
      }

      const items = await query.lean();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id." });

      const item = await model.findOne({ id }).select("-_id").lean();
      if (!item) return res.status(404).json({ error: "Not found." });
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const payload = { ...(req.body || {}) };
      if (payload.id === undefined || payload.id === null || payload.id === "") {
        payload.id = await getNextId(model);
      } else {
        payload.id = Number(payload.id);
      }

      const created = await model.create(payload);
      res.status(201).json(created.toJSON());
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.patch("/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id." });

      const updated = await model.findOneAndUpdate({ id }, req.body || {}, {
        new: true,
      });
      if (!updated) return res.status(404).json({ error: "Not found." });
      res.json(updated.toJSON());
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id." });

      const result = await model.deleteOne({ id });
      if (!result.deletedCount) return res.status(404).json({ error: "Not found." });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}

module.exports = { createResourceRouter };
